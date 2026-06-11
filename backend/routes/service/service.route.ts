import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import * as service from "../../controllers/service/service.controller";

const router = Router();

router.get("/get", asyncHandler(service.getServices));
router.get("/all", authMiddleWare, asyncHandler(service.getAllServices));
router.post("/create", authMiddleWare, asyncHandler(service.createService));
router.put("/update/:id", authMiddleWare, asyncHandler(service.updateService));
router.delete("/delete/:id", authMiddleWare, asyncHandler(service.deleteService));

export default router;
