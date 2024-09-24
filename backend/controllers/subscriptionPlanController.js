const SubscriptionPlan = require("../models/subscriptionPlan");

// Create a new subscription plan
exports.createPlan = async (req, res) => {
  try {
    const { name, description, duration, pricing, deliveryFrequency } =
      req.body;
    const newPlan = new SubscriptionPlan({
      name,
      description,
      duration,
      pricing,
      deliveryFrequency,
    });
    const savedPlan = await newPlan.save();
    res.status(201).json({
      message: "Subscription Plan created successfully",
      plan: savedPlan,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating plan", details: error });
  }
};

// Get all subscription plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: "Error fetching plans", details: error });
  }
};

// Get a specific plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: "Error fetching plan", details: error });
  }
};

// Update a subscription plan
exports.updatePlan = async (req, res) => {
  try {
    const { name, description, duration, pricing, deliveryFrequency } =
      req.body;
    const plan = await SubscriptionPlan.findById(req.params.id);

    if (!plan) return res.status(404).json({ error: "Plan not found" });

    plan.name = name || plan.name;
    plan.description = description || plan.description;
    plan.duration = duration || plan.duration;
    plan.pricing = pricing || plan.pricing;
    plan.deliveryFrequency = deliveryFrequency || plan.deliveryFrequency;

    const updatedPlan = await plan.save();
    res.status(200).json({
      message: "Subscription Plan updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating plan", details: error });
  }
};

// Delete a subscription plan
exports.deletePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    res.status(200).json({ message: "Subscription Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting plan", details: error });
  }
};
