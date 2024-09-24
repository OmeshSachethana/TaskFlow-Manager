const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
    unique: true,
    match: [/^E\d{5}$/, 'Employee ID must start with "E" followed by 5 digits.']
  },
  firstName: {
    type: String,
    required: true,
    minlength: [2, 'First name must be at least 2 characters long.'],
    maxlength: [50, 'First name cannot exceed 50 characters.']
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, 'Last name must be at least 2 characters long.'],
    maxlength: [50, 'Last name cannot exceed 50 characters.']
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  nic: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{9}[Vv]|\d{12}$/, 'NIC must be either 12 digits or 9 digits followed by "v" or "V".']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  }
}, { timestamps: true });

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
