const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

// CRUD Routes for Discounts
router.post('/', discountController.createDiscount);        // Create Discount
router.get('/', discountController.getDiscounts);           // Get All Discounts
router.get('/:id', discountController.getDiscountById);     // Get Discount by ID
router.put('/:id', discountController.updateDiscount);      // Update Discount
router.delete('/:id', discountController.deleteDiscount);   // Delete Discount

module.exports = router;
