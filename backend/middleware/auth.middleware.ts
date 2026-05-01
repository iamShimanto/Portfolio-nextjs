import type { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/envConfig";

export const authMiddleWare: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies?.jwt_access;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(accessToken, env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object") {
      throw new ApiError(401, "Unauthorized");
    }

    req.user = decoded as any;
    return next();
  } catch {
    throw new ApiError(401, "Unauthorized");
  }
};
