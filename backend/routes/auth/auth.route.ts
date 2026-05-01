import { Router } from "express";
import * as auth from "../../controllers/auth/auth.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { rateLimit } from "../../utils/rateLimit";

const router = Router();

// signup
router.post("/signup", rateLimit({ limit: 5, windowSec: 15 * 60, keyPrefix: "rl:signup" }), asyncHandler(auth.signup));
// login
router.post("/login", rateLimit({ limit: 5, windowSec: 15 * 60, keyPrefix: "rl:login" }), asyncHandler(auth.login));
// logout
router.post("/logout", asyncHandler(auth.logout));
// get current user
router.get("/me", asyncHandler(auth.getMe));






export default router;