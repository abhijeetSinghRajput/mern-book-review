import express from "express";
import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  updateCoverPhoto,
} from "../controllers/book.controller.js";
import { handlefileUpload } from "../middlewares/multer.middleware.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBook);

router.post("/", protectRoute, createBook);
router.put("/:id", protectRoute, updateBook);
router.put("/:id/cover", protectRoute, handlefileUpload("file"), updateCoverPhoto);
router.delete("/:id", protectRoute, deleteBook);

export default router;
