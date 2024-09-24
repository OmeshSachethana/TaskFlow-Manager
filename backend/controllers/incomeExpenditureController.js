const IncomeExpenditure = require('../models/incomeExpenditure'); // Adjust the path as necessary

// Create a new income & expenditure record
exports.createIncomeExpenditure = async (req, res) => {
  try {
    const incomeExpenditure = new IncomeExpenditure(req.body);
    await incomeExpenditure.save();
    res.status(201).json({
      message: 'Income & Expenditure record created successfully',
      data: incomeExpenditure
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating Income & Expenditure record',
      error: error.message
    });
  }
};

// Get all income & expenditure records
exports.getAllIncomeExpenditureRecords = async (req, res) => {
  try {
    const records = await IncomeExpenditure.find();
    res.status(200).json({
      message: 'Income & Expenditure records fetched successfully',
      data: records
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Income & Expenditure records',
      error: error.message
    });
  }
};

// Get a single income & expenditure record by ID
exports.getIncomeExpenditureById = async (req, res) => {
  try {
    const record = await IncomeExpenditure.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        message: 'Income & Expenditure record not found'
      });
    }
    res.status(200).json({
      message: 'Income & Expenditure record fetched successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Income & Expenditure record',
      error: error.message
    });
  }
};

// Update an income & expenditure record by ID
exports.updateIncomeExpenditure = async (req, res) => {
  try {
    const record = await IncomeExpenditure.findByIdAndUpdate(
      req.params.id,
      req.body, // Update the fields provided in the request body
      { new: true } // Return the updated document
    );
    if (!record) {
      return res.status(404).json({
        message: 'Income & Expenditure record not found',
      });
    }
    res.status(200).json({
      message: 'Income & Expenditure record updated successfully',
      data: record,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating Income & Expenditure record',
      error: error.message,
    });
  }
};

// Delete an income & expenditure record by ID
exports.deleteIncomeExpenditure = async (req, res) => {
  try {
    const record = await IncomeExpenditure.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        message: 'Income & Expenditure record not found'
      });
    }
    res.status(200).json({
      message: 'Income & Expenditure record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Income & Expenditure record',
      error: error.message
    });
  }
};
