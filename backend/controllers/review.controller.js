import Review from "../models/Review.js";
import Book from "../models/Book.js";

// ✅ Create review
export const createReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; // from auth middleware

    // prevent duplicate review by same user
    const existing = await Review.findOne({ user: userId, book: bookId });
    if (existing) return res.status(400).json({ message: "Already reviewed this book" });

    const review = await Review.create({
      user: userId,
      book: bookId,
      rating,
      comment,
    });

    // recalculate average rating
    const reviews = await Review.find({ book: bookId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Book.findByIdAndUpdate(bookId, { averageRating: avgRating });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all reviews for a book
export const getBookReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId.toString())
      return res.status(403).json({ message: "Not authorized" });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    // recalc book average rating
    const reviews = await Review.find({ book: review.book });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Book.findByIdAndUpdate(review.book, { averageRating: avgRating });

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId.toString())
      return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();

    // recalc avg rating
    const reviews = await Review.find({ book: review.book });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    await Book.findByIdAndUpdate(review.book, { averageRating: avgRating });

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
