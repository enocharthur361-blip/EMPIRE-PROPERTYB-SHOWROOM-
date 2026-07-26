// Payments Routes
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const auth = require('../middleware/auth');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET
});

// @route POST /api/payments/create-paypal-payment
// @desc Create PayPal payment
router.post('/create-paypal-payment', auth, async (req, res) => {
  try {
    const { plan, amount } = req.body;
    const user = await User.findById(req.user.id);

    const paymentDetails = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
        payer_info: {
          email: user.email,
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ')[1] || '',
          phone: user.phone
        }
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`
      },
      transactions: [{
        amount: {
          total: amount.toString(),
          currency: 'AED',
          details: {
            subtotal: amount.toString()
          }
        },
        description: `EMPIRE Premium Subscription - ${plan} plan`,
        invoice_number: `INV-${Date.now()}`,
        custom: JSON.stringify({ userId: req.user.id, plan })
      }]
    };

    paypal.payment.create(paymentDetails, async (error, payment) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Payment creation failed' });
      }

      // Create payment record
      const newPayment = new Payment({
        userId: req.user.id,
        amount,
        status: 'pending',
        paymentMethod: 'paypal',
        paypalOrderId: payment.id,
        planType: plan,
        description: `EMPIRE ${plan} subscription upgrade`
      });

      await newPayment.save();

      const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;

      res.json({
        paymentId: payment.id,
        approvalUrl
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/payments/execute-paypal-payment
// @desc Execute PayPal payment
router.post('/execute-paypal-payment', auth, async (req, res) => {
  try {
    const { paymentId, payerId, plan } = req.body;

    const executeDetails = {
      payer_id: payerId
    };

    paypal.payment.execute(paymentId, executeDetails, async (error, payment) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Payment execution failed' });
      }

      if (payment.state !== 'approved') {
        return res.status(400).json({ message: 'Payment not approved' });
      }

      // Update payment record
      const paymentRecord = await Payment.findOne({ paypalOrderId: paymentId });
      paymentRecord.status = 'completed';
      paymentRecord.transactionId = payment.transactions[0].related_resources[0].sale.id;
      paymentRecord.paypalPayerId = payerId;
      await paymentRecord.save();

      // Create/Update subscription
      const subscriptionFeatures = getSubscriptionFeatures(plan);
      const renewalDate = new Date();
      renewalDate.setMonth(renewalDate.getMonth() + 1);

      let subscription = await Subscription.findOne({ userId: req.user.id, status: 'active' });

      if (subscription) {
        subscription.plan = plan;
        subscription.renewalDate = renewalDate;
        subscription.features = subscriptionFeatures;
      } else {
        subscription = new Subscription({
          userId: req.user.id,
          plan,
          status: 'active',
          amount: paymentRecord.amount,
          paymentMethod: 'paypal',
          transactionId: paymentRecord.transactionId,
          renewalDate,
          features: subscriptionFeatures
        });
      }

      await subscription.save();

      // Update user subscription
      const user = await User.findById(req.user.id);
      user.subscription = {
        plan,
        status: 'active',
        startDate: new Date(),
        renewalDate,
        features: subscriptionFeatures
      };
      await user.save();

      res.json({
        message: 'Payment successful',
        subscription
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/payments/history
// @desc Get payment history
router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function getSubscriptionFeatures(plan) {
  const features = {
    free: {
      maxListingsPerMonth: 5,
      photoUpload: true,
      videoUpload: true,
      smsNotifications: false,
      mortgageCalculator: true,
      propertyComparison: true
    },
    premium: {
      maxListingsPerMonth: null,
      photoUpload: true,
      videoUpload: true,
      smsNotifications: true,
      emailNotifications: true,
      mortgageCalculator: true,
      propertyComparison: true,
      virtualTour: true,
      marketAnalysis: true,
      aiRecommendations: true,
      documentManagement: true,
      prioritySupport: true,
      teamManagement: true,
      agentLimit: 10
    },
    enterprise: {
      maxListingsPerMonth: null,
      photoUpload: true,
      videoUpload: true,
      smsNotifications: true,
      emailNotifications: true,
      mortgageCalculator: true,
      propertyComparison: true,
      virtualTour: true,
      marketAnalysis: true,
      aiRecommendations: true,
      documentManagement: true,
      customBranding: true,
      apiAccess: true,
      prioritySupport: true,
      teamManagement: true,
      agentLimit: null
    }
  };

  return features[plan] || features.free;
}

module.exports = router;