const mongoose = require('mongoose');

// Define the Payment schema
const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Credit Card', 'Debit Card'],  // Restricted to these two options
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    match: [/^\d{16}$/, 'Card number must be exactly 16 digits'],  // Validate 16-digit card number
    unique: true  // Ensures that the card number is unique
  },
  name: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true,
    match: [/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Expiry date must be in MM/YY or MM/YYYY format']  // Validate MM/YY or MM/YYYY format
  },
  cvv: {
    type: String,
    required: true,
    match: [/^\d{3}$/, 'CVV must be exactly 3 digits']  // Validate 3-digit CVV
  }
}, { timestamps: true });

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
