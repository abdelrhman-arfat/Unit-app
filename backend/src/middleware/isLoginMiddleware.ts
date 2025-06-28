import { NextFunction, Request, Response } from "express";
import { Tokens } from "../constants/Tokens.js";
import { jsonStandard } from "../utils/jsonStander.js";
import { jwtService } from "../services/JwtService";
import { userService } from "../services/UserService.js";
import { JwtPayload } from "jsonwebtoken";
import { user } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: user;
    }
  }
}

const UnauthorizedResponse = (res: Response) => {
  return res.status(401).json(jsonStandard(null, 401, "Unauthorized"));
};

export const isLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Unauthorized = UnauthorizedResponse(res);

  const token = req.cookies[Tokens.token];
  if (!token) {
    return Unauthorized;
  }
  const payload = jwtService.decodeToken(token) as JwtPayload;
  if (!payload) {
    return Unauthorized;
  }

  const user = await userService.getUserById(payload.id);

  if (!user) {
    return Unauthorized;
  }

  req.user = user;
  next();
};
