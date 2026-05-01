import { Router } from "express";
import * as contact from "../../controllers/contect/contact.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { authMiddleWare } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create", asyncHandler(contact.createContact));
router.get("/get", authMiddleWare, asyncHandler(contact.getContacts));
router.get("/get/:id", authMiddleWare, asyncHandler(contact.getContactById));
router.delete(
  "/delete/:id",
  authMiddleWare,
  asyncHandler(contact.deleteContactById),
);
router.post("/reply/:id", authMiddleWare, asyncHandler(contact.replyContact));
router.post(
  "/mark-read/:id",
  authMiddleWare,
  asyncHandler(contact.markContactAsRead),
);

export default router;
