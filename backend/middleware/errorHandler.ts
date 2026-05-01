import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal server error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
};
