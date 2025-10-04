import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import validator from "validator";
import bcrypt from "bcryptjs";

export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = req.user;
    return res.status(200).json({
      message: "Authenticcated",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in checkAuth controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, fullName, password: inputPassword } = req.body;
    console.log(email);
    if (!fullName?.trim() || !email?.trim() || !inputPassword?.trim()) {
      return res.status(400).json({ message: "All fields required." });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength
    if (!validator.isLength(inputPassword, { min: 6 })) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters.",
      });
    }

    const normalizedEmail = validator.normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(inputPassword, salt);

    const newUser = await User.create({
      fullName: validator.escape(fullName),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // issue token + cookie
    generateToken(res, newUser);

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("[controller/signup]: \n", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields required." });
    }

    const normalizedEmail = validator.normalizeEmail(email);

    // find user with password field
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // issue token + cookie
    generateToken(res, user);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[controller/login]: \n", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("[controller/logout]: \n", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
