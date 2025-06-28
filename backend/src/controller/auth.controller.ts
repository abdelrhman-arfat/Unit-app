import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import { jsonStandard } from "../utils/jsonStander.js";
import { jwtRefreshService, jwtService } from "../services/JwtService.js";
import { Tokens } from "../constants/Tokens.js";

import type { TokenSettingType } from "../types/TokenSettingType.js";
import type { User } from "../types/User.js";

dotenv.config();
const prisma = new PrismaClient();

// ------------------------------ Controllers --------------------------------

/**
 * @name   General
 * @param  req work with dependency injection take request body data
 * @param  res work with dependency injection to return the response
 */

/**
 * @name    register
 * @returns response with status 200 and cookies with tokens and json data
 */
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json(jsonStandard(null, 409, "User already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: "",
      Grade: "first",
    },
  });

  return setResponseForAuth(res, newUser, "Register successfully");
};

/**
 * @name    login
 * @returns response with status 200 and cookies with tokens and json data
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user || !user.password) {
    return res
      .status(401)
      .json(jsonStandard(null, 401, "Invalid email or password"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json(jsonStandard(null, 401, "Invalid email or password"));
  }

  return setResponseForAuth(res, user, "login Successfully");
};

/**
 * @name        loginWithGoogle
 * @description login with google OAuth Protocol with Google service using passport.js
 * @returns     response with status 200 and cookies with tokens and json data
 */
const loginWithGoogle = async (req: Request, res: Response) => {
  const { email, name, image } = req.body;

  let user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.users.create({
      data: {
        name,
        email,
        image,
        Grade: "first",
      },
    });
  }

  return setResponseForAuth;
};

/**
 * @name        logout
 * @description clear cookies and end user session
 */
const logout = (req: Request, res: Response) => {
  const clearedCookiesSetting = tokenSetting(0);
  res.clearCookie(Tokens.token, clearedCookiesSetting);
  res.clearCookie(Tokens.refreshToken, clearedCookiesSetting);
  return res.status(200).json(jsonStandard(null, 200, "Logout successfully"));
};

export { register, login, loginWithGoogle, logout };

// -------------------------------- UTILS ----------------------------

const defaultMaxAgeToken = 24 * 60 * 60 * 1000;
const defaultMaxAgeRefreshToken = 30 * 24 * 60 * 60 * 1000;

// token settings
const tokenSetting: TokenSettingType = (maxAge) => ({
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge,
});

// what will be returned for the user data
const userInResponse = (user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  image: user.image,
  Grade: user.Grade,
});

// Handle setting response's cookies and json data
const setResponseForAuth = (
  res: Response,
  user: User,
  message: string
): Response => {
  const payload = {
    id: user.id,
  };
  const token = jwtService.generateToken(payload);
  const refreshToken = jwtRefreshService.generateToken(payload);

  const cookieOfToken = tokenSetting(defaultMaxAgeToken);
  const cookieOfRefreshToken = tokenSetting(defaultMaxAgeRefreshToken);

  const returnedUser = userInResponse(user);

  return res
    .cookie(Tokens.token, token, cookieOfToken)
    .cookie(Tokens.refreshToken, refreshToken, cookieOfRefreshToken)
    .status(200)
    .json(jsonStandard({ user: returnedUser }, 200, message));
};
