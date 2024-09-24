const mongoose = require('mongoose');

// Define the Schedule schema
const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Electronics', 'Chemicals', 'Other'],  // Restricted to these 3 categories
    required: true
  },
  location: {
    type: String,
    enum: ['Dankotuwa', 'Negombo', 'Colombo'],  // Restricted to these 3 locations
    required: true
  }
}, { timestamps: true });

// Create the Schedule model
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
