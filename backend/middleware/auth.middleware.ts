import type { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/envConfig";

type AuthTokenPayload = {
  userId: number;
};

export const authMiddleWare: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(accessToken, env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || typeof decoded.userId !== "number") {
      throw new ApiError(401, "Unauthorized");
    }

    req.userId = decoded.userId as AuthTokenPayload["userId"];
    return next();
  } catch {
    throw new ApiError(401, "Unauthorized");
  }
};
