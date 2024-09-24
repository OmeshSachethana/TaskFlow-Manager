const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },  // e.g., weekly, monthly
  pricing: { type: Number, required: true },
  deliveryFrequency: { type: String, required: true },  // e.g., once a week
}, { timestamps: true });

// Check if model exists before defining it
module.exports = mongoose.models.SubscriptionPlan || mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
