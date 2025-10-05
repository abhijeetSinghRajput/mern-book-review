import express from "express";
import {
  createReview,
  getBookReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.get("/:bookId", getBookReviews);
router.post("/:bookId", protectRoute, createReview);
router.put("/:reviewId", protectRoute, updateReview);
router.delete("/:reviewId", protectRoute, deleteReview);

export default router;
