const Promotion = require("../models/promotion");

// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    const savedPromotion = await promotion.save();
    res
      .status(201)
      .json({
        message: "Promotion created successfully",
        promotion: savedPromotion,
      });
  } catch (error) {
    res.status(500).json({ error: "Error creating promotion" });
  }
};

// Get all promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().populate("applicableProducts");
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching promotions" });
  }
};


// Get a promotion by ID
exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate(
      "applicableProducts"
    );
    if (!promotion)
      return res.status(404).json({ error: "Promotion not found" });
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Error fetching promotion" });
  }
};

// Update a promotion by ID
exports.updatePromotion = async (req, res) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("applicableProducts");
    if (!updatedPromotion)
      return res.status(404).json({ error: "Promotion not found" });
    res
      .status(200)
      .json({
        message: "Promotion updated successfully",
        promotion: updatedPromotion,
      });
  } catch (error) {
    res.status(500).json({ error: "Error updating promotion" });
  }
};

// Delete a promotion by ID
exports.deletePromotion = async (req, res) => {
  try {
    const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!deletedPromotion)
      return res.status(404).json({ error: "Promotion not found" });
    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting promotion" });
  }
};
