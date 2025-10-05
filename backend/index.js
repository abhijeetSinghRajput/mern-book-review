
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5173"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});