const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images to 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original filename
  },
});

// File filter to only accept image types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

// Initialize multer with storage options and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Create a new product
exports.createProduct = [
  upload.single("image"), // Handle single image upload
  async (req, res) => {
    try {
      const { name, description, price, quantity, category } = req.body;
      let imageUrl = "";

      // Check if an image was uploaded
      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`; // Store the path to the image
      }

      // Create the product object
      const product = new Product({
        name,
        description,
        price,
        quantity,
        category,
        image: imageUrl,
      });

      // Save the product to the database
      const savedProduct = await product.save();
      res
        .status(201)
        .json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  },
];

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

exports.updateProduct = [
  upload.single("image"), // Handle image upload for updating
  async (req, res) => {
    try {
      const productId = req.params.id;
      let updatedData = req.body;

      // Find the product first to check for the existing image
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // If a new image is uploaded
      if (req.file) {
        const existingImagePath = path.join(__dirname, "../", product.image);
        const newImageName = `${Date.now()}_${req.file.originalname}`;
        const newImagePath = `/uploads/${newImageName}`;

        // Check if the existing image file exists and remove it
        if (fs.existsSync(existingImagePath)) {
          fs.unlinkSync(existingImagePath);
        }

        // Move the new image to the correct location
        fs.renameSync(req.file.path, path.join(__dirname, "../", newImagePath));
        updatedData.image = newImagePath;
      }

      // Update the product with the new data
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true }
      );

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Error updating product" });
    }
  },
];

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the image from the uploads folder if it exists
    if (product.image) {
      const imagePath = path.join(__dirname, "../", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Remove the image file
      }
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

// Search for products based on query parameters
exports.searchProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    // Build the query object
    let query = {};

    // Case-insensitive name match
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    // Exact category match
    if (category) {
      query.category = category;
    }

    // Handle price range filtering with type checking
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        const min = parseFloat(minPrice);
        if (!isNaN(min)) {
          query.price.$gte = min;
        }
      }
      if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (!isNaN(max)) {
          query.price.$lte = max;
        }
      }
    }

    // Fetch products that match the query
    const products = await Product.find(query);

    // Check if no products are found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching your criteria" });
    }

    // Return matching products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching products", details: error.message });
  }
};

