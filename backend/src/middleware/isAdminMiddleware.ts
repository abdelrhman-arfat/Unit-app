import { roles, user } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { setResponse } from "../utils/jsonStander.js";

/**
 * @param req
 * @param res
 * @param next
 * @description check if the user role is admin from the middleware before which check if is login
 */
export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as user;

  if (!user || !user.role) {
    return setResponse(res, { data: null }, 401, "You are not logged in");
  }

  const allowedRoles: roles[] = [roles.admin, roles.doctor];

  if (!allowedRoles.includes(user.role)) {
    return setResponse(res, { data: null }, 403, "You are not admin");
  }

  next();
};
