import { Request, Response, NextFunction } from "express";
import { validate as validateUUID } from "uuid";
import { ApiError } from "../utils/ApiError";

export function validateUuidParam(paramName: string = "id") {
  return (req: Request, res: Response, next: NextFunction) => {
    const paramValue = req.params[paramName];
    
    if (!paramValue || !validateUUID(paramValue)) {
      return next(ApiError.badRequest(`Invalid UUID format for parameter: ${paramName}`));
    }
    
    next();
  };
}
