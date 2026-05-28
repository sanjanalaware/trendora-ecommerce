import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// USER
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
// ADMIN
router.get("/", protect, getAllOrders);
router.put("/:id", protect, updateOrderStatus);

export default router;
