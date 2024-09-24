const mongoose = require('mongoose');

const validityPeriodSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true }
});

const promotionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  discountPercentage: { type: Number, required: true },
  validityPeriod: { type: validityPeriodSchema, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
