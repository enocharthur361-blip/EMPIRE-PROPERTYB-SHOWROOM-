// Subscription and PayPal Configuration

// Subscription Plans
const SUBSCRIPTION_PLANS = {
    free: {
        name: 'Free Plan',
        price: 0,
        currency: 'AED',
        features: {
            maxListingsPerMonth: 5,
            photoUpload: false,
            videoUpload: false,
            propertyAnalysis: false,
            prioritySupport: false,
            teamManagement: false
        },
        duration: null // Unlimited
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
            teamManagement: true
        },
        duration: 'monthly'
    }
};

// PayPal Configuration
const PAYPAL_CONFIG = {
    // Sandbox credentials
    sandboxMode: true,
    // Replace with your actual PayPal Business Account Email
    businessEmail: 'your-paypal-business-email@example.com',
    // Return URLs
    returnUrl: window.location.origin + '/payment-success.html',
    cancelUrl: window.location.origin + '/dashboard.html'
};

// Generate PayPal Payment Link
function generatePayPalLink(user, plan) {
    const planData = SUBSCRIPTION_PLANS[plan];
    
    const params = new URLSearchParams({
        cmd: '_xclick',
        business: PAYPAL_CONFIG.businessEmail,
        item_name: `EMPIRE Property Platform - ${planData.name}`,
        amount: planData.price.toFixed(2),
        currency_code: planData.currency,
        invoice: `EMPIRE-${user.id}-${Date.now()}`,
        custom: JSON.stringify({ userId: user.id, plan: plan }),
        return: PAYPAL_CONFIG.returnUrl,
        cancel_return: PAYPAL_CONFIG.cancelUrl,
        notify_url: window.location.origin + '/paypal-webhook.php'
    });
    
    const baseUrl = PAYPAL_CONFIG.sandboxMode 
        ? 'https://www.sandbox.paypal.com/cgi-bin/webscr?' 
        : 'https://www.paypal.com/cgi-bin/webscr?';
    
    return baseUrl + params.toString();
}

// Handle Payment Success
function handlePaymentSuccess(userId, plan) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id == userId);
    
    if (userIndex !== -1) {
        users[userIndex].subscription = {
            plan: plan,
            status: 'active',
            startDate: new Date().toISOString(),
            renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            features: SUBSCRIPTION_PLANS[plan].features
        };
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update current user
        if (JSON.parse(localStorage.getItem('currentUser')).id == userId) {
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
    }
}

// List Limit Check
function canCreateListing(user) {
    const planData = SUBSCRIPTION_PLANS[user.subscription.plan];
    
    if (planData.features.maxListingsPerMonth === null) {
        return true; // Unlimited
    }
    
    return user.subscription.listingsUsed < planData.features.maxListingsPerMonth;
}

// Feature Access Check
function hasFeatureAccess(user, feature) {
    return user.subscription && user.subscription.features && user.subscription.features[feature];
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SUBSCRIPTION_PLANS,
        PAYPAL_CONFIG,
        generatePayPalLink,
        handlePaymentSuccess,
        canCreateListing,
        hasFeatureAccess
    };
}