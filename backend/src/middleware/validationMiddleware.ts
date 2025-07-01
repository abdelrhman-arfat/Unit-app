import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { jsonStandard, setResponse } from "../utils/jsonStander.js";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(jsonStandard(null, 400, "Validation error", errors.array()[0].msg));
  }
  next();
};
