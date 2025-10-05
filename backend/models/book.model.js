import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    coverPhoto: { url: String, public_id: String },
    price: { type: Number, default: 0 },
    genre: { type: String },
    description: { type: String, require: true },
    author: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
