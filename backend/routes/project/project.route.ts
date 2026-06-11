import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import * as project from "../../controllers/project/project.controller";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/get", asyncHandler(project.getProjects));
router.get("/all", authMiddleWare, asyncHandler(project.getAllProjects));
router.post("/create", authMiddleWare, upload.single("image"), asyncHandler(project.createProject));
router.put("/update/:id", authMiddleWare, upload.single("image"), asyncHandler(project.updateProject));
router.delete("/delete/:id", authMiddleWare, asyncHandler(project.deleteProject));
router.post("/like/:id", asyncHandler(project.likeProject));

export default router;
