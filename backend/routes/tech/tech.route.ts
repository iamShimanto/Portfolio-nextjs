import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import * as tech from "../../controllers/tech/tech.controller";
import multer from "multer";

const router = Router();
const upload = multer();

router.post("/create", authMiddleWare, upload.single("logo"), asyncHandler(tech.createTech));
router.get("/get", authMiddleWare, asyncHandler(tech.getTechs));


export default router;