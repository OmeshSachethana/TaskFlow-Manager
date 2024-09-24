const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// CRUD routes for promotions
router.post('/', promotionController.createPromotion);       // Create
router.get('/', promotionController.getAllPromotions);       // Read all
router.get('/:id', promotionController.getPromotionById);    // Read single
router.put('/:id', promotionController.updatePromotion);     // Update
router.delete('/:id', promotionController.deletePromotion);  // Delete

module.exports = router;
