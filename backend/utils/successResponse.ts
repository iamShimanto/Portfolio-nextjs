import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  message = "Success",
  statusCode = 200,
  data?: T,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
