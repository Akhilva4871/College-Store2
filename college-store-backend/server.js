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
app.put('/api/products/:id', async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, category, stock },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ msg: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating product', error });
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
