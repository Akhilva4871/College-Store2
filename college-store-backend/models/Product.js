const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0 // Optional: Ensures price is not negative
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Note Books', 'Records', 'Calculators', 'Pen & Pencil', 'Others'] // Limits category to specific values
    },
    stock: { 
        type: Number, 
        required: true,
        min: 0, // Optional: Ensures stock is not negative
        default: 0 // Optional: Sets a default stock level if none is provided
    }
});

module.exports = mongoose.model('Product', productSchema);
