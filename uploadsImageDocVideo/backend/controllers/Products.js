const Product = require("../models/Products");

exports.createProduct = async (req, res) => {
  const { name, price, availability } = req.body;
  try {
    const newProduct = new Product({ name, price, availability });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: "Error fetching products", error: err });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Error fetching product", error: err });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, availability } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, availability },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted", product: result });
  } catch (err) {
    res.status(400).json({ message: "Error deleting product", error: err });
  }
};

exports.findProductByName = async (req, res) => {
  const { name } = req.params;
  try {
    const products = await Product.find({ name: new RegExp(name, 'i') });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found with that name" });
    }
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: "Error searching for products", error: err });
  }
};

exports.findProductByAvailability = async (req, res) => {
  const { availability } = req.params;
  try {
    const products = await Product.find({ availability });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found with that availability status" });
    }
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: "Error searching for products", error: err });
  }
};

exports.findProductByPriceGreaterThan = async (req, res) => {
  const { price } = req.params;
  try {
    const products = await Product.find({ price: { $gt: price } });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found with price greater than specified value" });
    }
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: "Error searching for products", error: err });
  }
};
