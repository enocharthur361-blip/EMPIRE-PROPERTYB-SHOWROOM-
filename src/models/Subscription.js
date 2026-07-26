// Subscription Model
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'pending'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  renewalDate: Date,
  amount: Number,
  currency: {
    type: String,
    default: 'AED'
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  paymentMethod: String,
  transactionId: String,
  features: {
    maxListingsPerMonth: Number,
    photoUpload: Boolean,
    videoUpload: Boolean,
    smsNotifications: Boolean,
    emailNotifications: Boolean,
    mortgageCalculator: Boolean,
    propertyComparison: Boolean,
    virtualTour: Boolean,
    marketAnalysis: Boolean,
    aiRecommendations: Boolean,
    documentManagement: Boolean,
    customBranding: Boolean,
    apiAccess: Boolean,
    prioritySupport: Boolean,
    teamManagement: Boolean,
    agentLimit: Number,
    apiCallLimit: Number
  },
  autoRenewal: {
    type: Boolean,
    default: true
  },
  cancellationReason: String,
  cancellationDate: Date,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);