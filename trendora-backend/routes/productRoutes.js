import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE PRODUCT (Protected)
router.post("/", protect, createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// UPDATE PRODUCT (Protected)
router.put("/:id", protect, updateProduct);

// DELETE PRODUCT (Protected)
router.delete("/:id", protect, deleteProduct);

export default router;
