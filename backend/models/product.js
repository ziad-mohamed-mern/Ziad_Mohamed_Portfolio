const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    tech: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    github: {
        type: String,
    },
    demo: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;