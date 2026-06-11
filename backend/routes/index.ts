import { Router } from "express";
import { Request, Response } from "express";
import { rateLimit } from "../utils/rateLimit";
import authRoute from "./auth/auth.route";
import contactRoute from "./contact/contact.route";
import techRoute from "./tech/tech.route";
import profileRoute from "./profile/profile.route";
import projectRoute from "./project/project.route";
import serviceRoute from "./service/service.route";
import socialRoute from "./social/social.route";

const router = Router();

router.use(
  rateLimit({ limit: 1000, windowSec: 15 * 60, keyPrefix: "rl:global" }),
);

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/contact", contactRoute);
router.use("/api/v1/tech", techRoute);
router.use("/api/v1/profile", profileRoute);
router.use("/api/v1/project", projectRoute);
router.use("/api/v1/service", serviceRoute);
router.use("/api/v1/social", socialRoute);

router.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Api endpoint not found" });
});

export default router;
