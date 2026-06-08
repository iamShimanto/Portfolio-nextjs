import { Router } from "express";
import * as auth from "../../controllers/auth/auth.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { rateLimit } from "../../utils/rateLimit";
import { authMiddleWare } from "../../middleware/auth.middleware";

const router = Router();

// signup
router.post("/signup", rateLimit({ limit: 5, windowSec: 15 * 60, keyPrefix: "rl:signup" }), asyncHandler(auth.signup));
// login
router.post("/login", rateLimit({ limit: 20, windowSec: 15 * 60, keyPrefix: "rl:login" }), asyncHandler(auth.login));
// logout
router.post("/logout", asyncHandler(auth.logout));
// get current user
router.get("/me", authMiddleWare, asyncHandler(auth.getMe));
// change password
router.post("/change-password", authMiddleWare, asyncHandler(auth.changePassword));






export default router;