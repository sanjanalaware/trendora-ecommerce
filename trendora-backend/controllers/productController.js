import Product from "../models/Product.js";
import mongoose from "mongoose";

const isValidProductId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    if (!isValidProductId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    if (!isValidProductId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.title = req.body.title ?? product.title;
    product.description = req.body.description ?? product.description;

    product.price = req.body.price ?? product.price;

    product.image = req.body.image ?? product.image;

    product.category = req.body.category ?? product.category;

    product.stock = req.body.stock ?? product.stock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    if (!isValidProductId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
