import { NextFunction, Request, Response } from "express";
import { Tokens } from "../constants/Tokens.js";
import { jsonStandard, setResponse } from "../utils/jsonStander.js";
import { jwtService } from "../services/JwtService.js";
import { userService } from "../services/UserService.js";
import { JwtPayload } from "jsonwebtoken";
import { user } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: Omit<user, "password">;
      file?: Express.Multer.File;
      files?:
        | { [fieldname: string]: Express.Multer.File[] }
        | Express.Multer.File[];
    }
  }
}

const UnauthorizedResponse = (res: Response) => {
  return setResponse(res, { data: null }, 401, "login first and try again");
};

/**
 * @name isLoginMiddleware
 * @param req
 * @param res
 * @param next
 * @description check if the user is login
 * @returns response with status 401 if not login | return the user in req.user
 */
export const isLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[Tokens.token];
  if (!token) {
    return UnauthorizedResponse(res);
  }

  const payload = jwtService.verifyToken(token) as JwtPayload;
  if (!payload) {
    return UnauthorizedResponse(res);
  }

  const user = await userService.getUserById(payload.id);
  if (!user) {
    return UnauthorizedResponse(res);
  }
  req.user = user as user;
  (req.user as any).password && delete (req.user as any).password;
  next();
};
