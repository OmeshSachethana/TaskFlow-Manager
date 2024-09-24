const express = require('express');
const paymentController = require('../controllers/paymentController');  // Adjust the path as needed
const router = express.Router();

router.post('/', paymentController.createPayment);
router.get('/:id', paymentController.getPaymentById);
router.get('/', paymentController.getAllPayments);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
