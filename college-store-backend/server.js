const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());  // Enable CORS for all origins (you can configure this further)
app.use(bodyParser.json());  // Middleware to parse JSON data

// MongoDB Atlas connection string (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://akhilva:akhilva@cluster0.xbrqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));

// Product Model
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    description: String
}));

// Admin Model (For login authentication)
const Admin = mongoose.model('Admin', new mongoose.Schema({
    email: String,
    password: String
}));

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

// Edit product route
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;

    try {
        // Find and update the product
        const product = await Product.findByIdAndUpdate(id, { name, price, stock, description }, { new: true });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

// Get all products (optional)
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
