import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import * as social from "../../controllers/social/social.controller";

const router = Router();

router.get("/get", asyncHandler(social.getSocials));
router.get("/all", authMiddleWare, asyncHandler(social.getAllSocials));
router.post("/create", authMiddleWare, asyncHandler(social.createSocial));
router.put("/update/:id", authMiddleWare, asyncHandler(social.updateSocial));
router.delete("/delete/:id", authMiddleWare, asyncHandler(social.deleteSocial));

export default router;
