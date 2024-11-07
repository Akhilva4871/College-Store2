// routes/products.js
const express = require('express');
//const auth = require('./middleware/auth');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all products
router.get('/products', async (req, res) => {
  try {
      const { search } = req.query;
      let products;

      if (search) {
          // Search by product name or description
          products = await Product.find({
              $or: [
                  { name: { $regex: search, $options: 'i' } },  // Case-insensitive search for name
                  { description: { $regex: search, $options: 'i' } }  // Case-insensitive search for description
              ]
          });
      } else {
          // No search query, fetch all products
          products = await Product.find();
      }

      res.json({ products });
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to load products." });
  }
})

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch all products or search by query
router.get('/products', async (req, res) => {
  try {
      const { search } = req.query;
      let products;

      if (search) {
          products = await Product.find({
              $or: [
                  { name: { $regex: search, $options: 'i' } },
                  { description: { $regex: search, $options: 'i' } }
              ]
          });
      } else {
          products = await Product.find();
      }

      res.json({ products });
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to load products." });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET products by category
router.get('/', async (req, res) => {
  try {
      const { category } = req.query;
      const products = await Product.find({ category: category }); // Filter products by category
      res.json({ products });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching products' });
  }
});


// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
