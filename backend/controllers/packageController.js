const Order = require("../models/Order");

// Admin approves or rejects a package
exports.approvePackage = async (req, res) => {
  try {
    const { decision } = req.body; // 'approve' or 'reject'
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Order not found" });

    order.approvalStatus = decision === "approve" ? "Approved" : "Rejected";
    await order.save();

    res
      .status(200)
      .json({ message: `Package ${decision}d successfully`, order });
  } catch (error) {
    res.status(500).json({ error: "Error approving package", details: error });
  }
};
