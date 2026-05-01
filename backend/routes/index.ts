import { Router } from "express";
const router = Router();
import { Request, Response } from "express";
import { rateLimit } from "../utils/rateLimit";


router.use(
  rateLimit({ limit: 1000, windowSec: 15 * 60, keyPrefix: "rl:global" }),
);

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});


router.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Api enpoint not found" });
});

export default router;
