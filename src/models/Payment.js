// Payment Model
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'AED'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'credit_card', 'debit_card', 'bank_transfer'],
    required: true
  },
  transactionId: String,
  paypalOrderId: String,
  paypalPayerId: String,
  planType: {
    type: String,
    enum: ['free', 'premium', 'enterprise']
  },
  invoiceNumber: String,
  description: String,
  metadata: mongoose.Schema.Types.Mixed,
  failureReason: String,
  refundAmount: Number,
  refundDate: Date,
  refundReason: String,
  ipAddress: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);