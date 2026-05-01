import { Router } from "express";
const router = Router();
import { Request, Response } from "express";
import { rateLimit } from "../utils/rateLimit";
import authRoute from "./auth/auth.route";
import contactRoute from "./contact/contact.route";
import techRoute from "./tech/tech.route";

router.use(
  rateLimit({ limit: 1000, windowSec: 15 * 60, keyPrefix: "rl:global" }),
);

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

// auth
router.use("/api/v1/auth", authRoute);
// contact
router.use("/api/v1/contact", contactRoute);
// tech
router.use("/api/v1/tech", techRoute);


router.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Api enpoint not found" });
});

export default router;
