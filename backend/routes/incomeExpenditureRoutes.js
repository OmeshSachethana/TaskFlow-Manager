const express = require('express');
const router = express.Router();
const incomeExpenditureController = require('../controllers/incomeExpenditureController');

// Create a new income & expenditure record
router.post('/', incomeExpenditureController.createIncomeExpenditure);

// Get all income & expenditure records
router.get('/', incomeExpenditureController.getAllIncomeExpenditureRecords);

// Get a single income & expenditure record by ID
router.get('/:id', incomeExpenditureController.getIncomeExpenditureById);

// Update an income & expenditure record by ID
router.put('/:id', incomeExpenditureController.updateIncomeExpenditure);

// Delete an income & expenditure record by ID
router.delete('/:id', incomeExpenditureController.deleteIncomeExpenditure);

module.exports = router;
