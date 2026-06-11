import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import * as tech from "../../controllers/tech/tech.controller";

const router = Router();

router.get("/get", asyncHandler(tech.getTechs));
router.get("/all", authMiddleWare, asyncHandler(tech.getAllTechs));
router.post("/create", authMiddleWare, asyncHandler(tech.createTech));
router.put("/update/:id", authMiddleWare, asyncHandler(tech.updateTech));
router.delete("/delete/:id", authMiddleWare, asyncHandler(tech.deleteTech));

export default router;
