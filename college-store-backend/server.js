const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: String,
    specifications: [String],
    image: String
});

const Product = mongoose.model("Product", productSchema);

// Get all products (for the admin page)
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// Update product details (for the admin to edit)
app.put("/api/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
});

// Add a new product (for the admin to add new products)
app.post("/api/products", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error adding product" });
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
