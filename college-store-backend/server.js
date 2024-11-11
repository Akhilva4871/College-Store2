const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const Product = require('./models/Product');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// POST route to add a new product
app.post('/api/products', async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    try {
        const newProduct = new Product({ name, price, description, category, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Error adding product', error });
    }
});

// GET route to get product details by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching product', error });
    }
});

// PUT route to update a product

// PUT route to update the entire product
app.put('/api/products/:id', async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, category, stock },
            { new: true } // Option to return the updated product
        );
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating product', error });
    }
});

// PUT route to decrease stock by quantity
app.put('/api/products/:id/decrease-stock', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Check if the stock is sufficient
        if (product.stock < quantity) {
            return res.status(400).json({ msg: 'Insufficient stock' });
        }

        // Decrease stock by the specified quantity
        product.stock -= quantity;

        // Save the updated product
        const updatedProduct = await product.save();
        res.json(updatedProduct);  // Send the updated product back to the frontend
    } catch (error) {
        res.status(500).json({ msg: 'Error updating stock', error });
    }
});


// GET route to retrieve products by category
app.get('/api/products', async (req, res) => {
    const { category } = req.query;

    try {
        let products;
        if (category) {
            products = await Product.find({ category });
        } else {
            products = await Product.find(); // Get all products if no category is specified
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching products', error });
    }
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Import routes
const productRoutes = require('./routes/products');

// Use the routes
app.use('/api', productRoutes);

// Login route for admin
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const adminEmail = "admin@gmail.com";
    const adminPassword = "12345671";

    if (email === adminEmail && password === adminPassword) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
