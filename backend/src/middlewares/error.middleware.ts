import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function errorMiddleware(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  // Log unexpected errors
  console.error("Unexpected error:", err);

  return res.status(500).json({
    message: "Internal server error",
    statusCode: 500,
  });
}
