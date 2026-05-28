import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// USER
router.post("/", protect, createOrder);

// ADMIN
router.get("/", protect, getAllOrders);
router.put("/:id", protect, updateOrderStatus);

export default router;
