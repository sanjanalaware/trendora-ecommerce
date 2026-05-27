import mongoose from "mongoose";

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addToCart = async (req, res) => {
  try {
    const productId = req.body.product || req.body.productId;
    const qty = Number(req.body.qty ?? 1);

    if (!productId || !isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Valid product id is required",
      });
    }

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        message: "Quantity must be a positive integer",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user._id,
        product: productId,
        qty,
      });
    }

    const populatedCartItem = await cartItem.populate("product");

    res.status(201).json(populatedCartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id })
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid cart item id",
      });
    }

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.json({
      message: "Cart item removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
