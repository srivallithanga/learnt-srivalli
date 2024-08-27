const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, required: true, enum: ['available', 'not available'] }
});

module.exports = mongoose.model("Product", productSchema);
