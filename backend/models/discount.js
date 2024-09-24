const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  applicablePlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' }],  // Link to plans
  discountPercentage: { type: Number, required: true },
  validityPeriod: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);
