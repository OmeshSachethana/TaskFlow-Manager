const Discount = require("../models/discount");

// Create a new discount
exports.createDiscount = async (req, res) => {
  try {
    const {
      name,
      description,
      applicablePlans,
      discountPercentage,
      validityPeriod,
    } = req.body;
    const newDiscount = new Discount({
      name,
      description,
      applicablePlans,
      discountPercentage,
      validityPeriod,
    });
    const savedDiscount = await newDiscount.save();
    res.status(201).json({
      message: "Discount created successfully",
      discount: savedDiscount,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating discount", details: error });
  }
};

// Get all discounts
exports.getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate("applicablePlans");
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching discounts", details: error });
  }
};

// Get a discount by ID
exports.getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id).populate(
      "applicablePlans"
    );
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ error: "Error fetching discount", details: error });
  }
};

// Update a discount
exports.updateDiscount = async (req, res) => {
  try {
    const {
      name,
      description,
      applicablePlans,
      discountPercentage,
      validityPeriod,
    } = req.body;
    const discount = await Discount.findById(req.params.id);

    if (!discount) return res.status(404).json({ error: "Discount not found" });

    discount.name = name || discount.name;
    discount.description = description || discount.description;
    discount.applicablePlans = applicablePlans || discount.applicablePlans;
    discount.discountPercentage =
      discountPercentage || discount.discountPercentage;
    discount.validityPeriod = validityPeriod || discount.validityPeriod;

    const updatedDiscount = await discount.save();
    res.status(200).json({
      message: "Discount updated successfully",
      discount: updatedDiscount,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating discount", details: error });
  }
};

// Delete a discount
exports.deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting discount", details: error });
  }
};
