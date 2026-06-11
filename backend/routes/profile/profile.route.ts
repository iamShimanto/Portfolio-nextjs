import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import * as profile from "../../controllers/profile/profile.controller";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/get", asyncHandler(profile.getProfile));
router.post("/upsert", authMiddleWare, upload.single("avatar"), asyncHandler(profile.upsertProfile));

export default router;
