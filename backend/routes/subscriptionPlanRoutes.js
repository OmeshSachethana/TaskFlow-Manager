const express = require('express');
const router = express.Router();
const subscriptionPlanController = require('../controllers/subscriptionPlanController');

// CRUD Routes for Subscription Plans
router.post('/', subscriptionPlanController.createPlan);        // Create Plan
router.get('/', subscriptionPlanController.getPlans);           // Get All Plans
router.get('/:id', subscriptionPlanController.getPlanById);     // Get Plan by ID
router.put('/:id', subscriptionPlanController.updatePlan);      // Update Plan
router.delete('/:id', subscriptionPlanController.deletePlan);   // Delete Plan

module.exports = router;
