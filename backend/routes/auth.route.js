import express from "express";
import {
  checkAuth,
  signup,
  login,
  logout,
} from "../controllers/auth.controller.js";

import {
  signupLimiter,
  loginLimiter,
} from "../middlewares/rateLimiter.middleware.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.get("/me", protectRoute, checkAuth);
router.post("/signup", signup); // TODO: signupLimiter
router.post("/login", login); // TODO: loginLimiter
router.post("/logout", logout);

export default router;
