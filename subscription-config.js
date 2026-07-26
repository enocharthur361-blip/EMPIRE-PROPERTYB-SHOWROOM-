/* ============================================
   UPDATED SUBSCRIPTION PLANS WITH NEW FEATURES
   ============================================ */

// Enhanced Subscription Plans
const SUBSCRIPTION_PLANS = {
    free: {
        name: 'Free Plan',
        price: 0,
        currency: 'AED',
        features: {
            maxListingsPerMonth: 5,
            photoUpload: true,        // NEW: Added for brokers
            videoUpload: true,        // NEW: Added for brokers
            propertyAnalysis: false,
            prioritySupport: false,
            teamManagement: false,
            smsNotifications: false,
            emailNotifications: true,
            virtualTour: false,
            mortgageCalculator: false,
            marketAnalysis: false,
            aiRecommendations: false,
            customBranding: false,
            apiAccess: false,
            bulkUpload: false,
            documentManagement: false,
            propertyComparison: false,
            transactionHistory: false
        },
        duration: null, // Unlimited
        brokerSpecific: {
            photoVideoAccess: true,   // NEW: Brokers can use free photo/video
            agentLimit: 1,
            propertyPerAgent: 5,
            apiCalls: 1000
        }
    },
    premium: {
        name: 'Premium Plan',
        price: 99,
        currency: 'AED',
        features: {
            maxListingsPerMonth: null, // Unlimited
            photoUpload: true,
            videoUpload: true,
            propertyAnalysis: true,
            prioritySupport: true,
            teamManagement: true,
            smsNotifications: true,
            emailNotifications: true,
            virtualTour: true,
            mortgageCalculator: true,
            marketAnalysis: true,
            aiRecommendations: true,
            customBranding: false,
            apiAccess: false,
            bulkUpload: true,
            documentManagement: true,
            propertyComparison: true,
            transactionHistory: true
        },
        duration: 'monthly',
        brokerSpecific: {
            photoVideoAccess: true,
            agentLimit: 10,
            propertyPerAgent: null,   // Unlimited
            apiCalls: 50000
        }
    },
    enterprise: {
        name: 'Enterprise Plan',
        price: 499,
        currency: 'AED',
        features: {
            maxListingsPerMonth: null,
            photoUpload: true,
            videoUpload: true,
            propertyAnalysis: true,
            prioritySupport: true,
            teamManagement: true,
            smsNotifications: true,
            emailNotifications: true,
            virtualTour: true,
            mortgageCalculator: true,
            marketAnalysis: true,
            aiRecommendations: true,
            customBranding: true,
            apiAccess: true,
            bulkUpload: true,
            documentManagement: true,
            propertyComparison: true,
            transactionHistory: true
        },
        duration: 'monthly',
        brokerSpecific: {
            photoVideoAccess: true,
            agentLimit: null,         // Unlimited
            propertyPerAgent: null,
            apiCalls: null            // Unlimited
        }
    }
};

// PayPal Configuration (Enhanced)
const PAYPAL_CONFIG = {
    sandboxMode: true,
    businessEmail: 'your-paypal-business-email@example.com',
    returnUrl: window.location.origin + '/payment-success.html',
    cancelUrl: window.location.origin + '/dashboard.html',
    webhookUrl: window.location.origin + '/api/paypal-webhook',
    // Supported currencies
    currencies: ['AED', 'USD', 'EUR']
};

// Feature Access Helper Functions
function canCreateListing(user) {
    const planData = SUBSCRIPTION_PLANS[user.subscription.plan];
    if (planData.features.maxListingsPerMonth === null) return true;
    return user.subscription.listingsUsed < planData.features.maxListingsPerMonth;
}

function hasFeatureAccess(user, feature) {
    const planData = SUBSCRIPTION_PLANS[user.subscription.plan];
    return planData.features[feature] === true;
}

function hasPhotoVideoAccess(user) {
    const planData = SUBSCRIPTION_PLANS[user.subscription.plan];
    
    // Brokers always have photo/video access (even free)
    if (user.role === 'broker' && planData.brokerSpecific.photoVideoAccess) {
        return true;
    }
    
    return planData.features.photoUpload && planData.features.videoUpload;
}

function getAgentLimit(user) {
    const planData = SUBSCRIPTION_PLANS[user.subscription.plan];
    return planData.brokerSpecific.agentLimit;
}

function getPropertyPerAgentLimit(user) {
    const planData = SUBSCRIPTION_PLANS[user.subscription.plan];
    return planData.brokerSpecific.propertyPerAgent;
}

function getApiCallLimit(user) {
    const planData = SUBSCRIPTION_PLANS[user.subscription.plan];
    return planData.brokerSpecific.apiCalls;
}

// Generate PayPal Payment Link (Enhanced)
function generatePayPalLink(user, plan) {
    const planData = SUBSCRIPTION_PLANS[plan];
    
    const params = new URLSearchParams({
        cmd: '_xclick',
        business: PAYPAL_CONFIG.businessEmail,
        item_name: `EMPIRE Property Platform - ${planData.name}`,
        amount: planData.price.toFixed(2),
        currency_code: 'AED',
        invoice: `EMPIRE-${user.id}-${Date.now()}`,
        custom: JSON.stringify({ userId: user.id, plan: plan }),
        return: PAYPAL_CONFIG.returnUrl,
        cancel_return: PAYPAL_CONFIG.cancelUrl,
        notify_url: PAYPAL_CONFIG.webhookUrl,
        // Additional PayPal parameters
        rm: 2, // Return method POST
        charset: 'utf-8',
        no_shipping: 1
    });
    
    const baseUrl = PAYPAL_CONFIG.sandboxMode 
        ? 'https://www.sandbox.paypal.com/cgi-bin/webscr?' 
        : 'https://www.paypal.com/cgi-bin/webscr?';
    
    return baseUrl + params.toString();
}

// Handle Payment Success (Enhanced)
function handlePaymentSuccess(userId, plan) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id == userId);
    
    if (userIndex !== -1) {
        users[userIndex].subscription = {
            plan: plan,
            status: 'active',
            startDate: new Date().toISOString(),
            renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            features: SUBSCRIPTION_PLANS[plan].features,
            paymentId: generatePaymentId(),
            amount: SUBSCRIPTION_PLANS[plan].price,
            lastPaymentDate: new Date().toISOString()
        };
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.id == userId) {
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
        
        // Log transaction
        logTransaction(userId, plan, SUBSCRIPTION_PLANS[plan].price);
        
        // Send notification
        sendSubscriptionNotification(users[userIndex]);
    }
}

// Generate unique payment ID
function generatePaymentId() {
    return 'PAY-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Log transactions
function logTransaction(userId, plan, amount) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
        id: generatePaymentId(),
        userId: userId,
        plan: plan,
        amount: amount,
        currency: 'AED',
        status: 'completed',
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Send subscription notification
function sendSubscriptionNotification(user) {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push({
        id: Date.now(),
        userId: user.id,
        type: 'subscription',
        title: `Welcome to ${SUBSCRIPTION_PLANS[user.subscription.plan].name}`,
        message: `Your subscription to ${SUBSCRIPTION_PLANS[user.subscription.plan].name} is now active. Enjoy all premium features!`,
        timestamp: new Date().toISOString(),
        read: false
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SUBSCRIPTION_PLANS,
        PAYPAL_CONFIG,
        canCreateListing,
        hasFeatureAccess,
        hasPhotoVideoAccess,
        getAgentLimit,
        getPropertyPerAgentLimit,
        getApiCallLimit,
        generatePayPalLink,
        handlePaymentSuccess,
        generatePaymentId,
        logTransaction,
        sendSubscriptionNotification
    };
}