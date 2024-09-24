const mongoose = require('mongoose');
const Employee = require('./employee');  // Import the Employee model

// Define the Employee Salary schema
const employeeSalarySchema = new mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
    unique: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  allowances: {
    type: Number,
    required: true
  },
  overtimeHours: {
    type: Number,
    required: true
  },
  overtimeRate: {
    type: Number,
    required: true
  },
  deductions: {
    type: Number,
    required: true
  },
  epfRate: {
    type: Number,
    required: true
  },
  grossSalary: {
    type: Number
  },
  epfContribution: {
    type: Number
  },
  netSalary: {
    type: Number
  }
}, { timestamps: true });

// Middleware to check if employeeID exists in the Employee collection before saving the salary
employeeSalarySchema.pre('save', async function (next) {
  try {
    const employee = await Employee.findOne({ employeeID: this.employeeID });
    if (!employee) {
      const error = new Error(`Employee with ID ${this.employeeID} does not exist.`);
      return next(error);  // Stop saving and send error
    }
    next();  // If employee exists, continue with saving
  } catch (error) {
    next(error);  // Handle any errors that occur during the lookup
  }
});

// Create the Employee Salary model
const EmployeeSalary = mongoose.model('EmployeeSalary', employeeSalarySchema);

module.exports = EmployeeSalary;
