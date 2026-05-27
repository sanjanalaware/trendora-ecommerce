import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      qty,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    await item.deleteOne();

    res.json({
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
