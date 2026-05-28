import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
const router = express.Router();

// USER
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
// ADMIN
router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);

export default router;
