import Book from "../models/book.model.js";
import { deleteImage, uploadStream } from "../utils/cloudinary.js";

// ✅ Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single book by ID
export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create new book
export const createBook = async (req, res) => {
  try {
    const { title, coverPhoto, price, genre, description, author } = req.body;

    console.log(req.body);
    if (!title || !description || !author)
      return res
        .status(400)
        .json({
          success: false,
          message: "Title, author & description are required",
        });

    const newBook = await Book.create({
      title,
      coverPhoto,
      price,
      genre,
      description,
      author,
    });

    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateCoverPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // ✅ If the book already has a cover, use its existing public_id to overwrite
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "book_covers",
          public_id: book.coverPhoto?.public_id || undefined, // overwrite if exists
          overwrite: true,
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    // ✅ Update book document
    book.coverPhoto = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
    await book.save();

    res.status(200).json({
      success: true,
      message: "Cover photo replaced successfully",
      data: book,
    });
  } catch (error) {
    console.error("Cover photo update failed:", error);
    res.status(500).json({ success: false, message: "Failed to replace cover photo" });
  }
};

