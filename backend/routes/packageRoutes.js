const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

// Admin approves or rejects a package
router.put("/:id/approve", packageController.approvePackage);

module.exports = router;
