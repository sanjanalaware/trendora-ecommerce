import Wishlist from "../models/Wishlist.js";

// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const existingItem = await Wishlist.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingItem) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user._id,
      product: productId,
    });

    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user._id,
    }).populate("product");

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE WISHLIST ITEM
export const removeWishlistItem = async (req, res) => {
  try {
    const item = await Wishlist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    await item.deleteOne();

    res.json({
      message: "Wishlist item removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
