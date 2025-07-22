import { CookieOptions, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { jsonStandard } from "../utils/jsonStander.js";
import { jwtRefreshService, jwtService } from "../services/JwtService.js";
import { Tokens } from "../constants/Tokens.js";

import type { TokenSettingType } from "../types/TokenSettingType.js";
import { userService } from "../services/UserService.js";
import { grades, roles, user } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { CLIENT_URL } from "../constants/ENV.js";

dotenv.config();

// ------------------------------ Controllers --------------------------------
/**
 * @param  req work with dependency injection take request body data
 * @param  res work with dependency injection to return the response
 */

/**
 * @name    register
 * @returns response with status 200 and cookies with tokens and json data
 */
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    return res
      .status(409)
      .json(jsonStandard(null, 409, "Email already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    ...userInCreate({ email, name, image: "" }),
    password: hashedPassword,
  };

  const newUser = await userService.createUser(userData as user);

  if (!newUser) {
    return res
      .status(500)
      .json(jsonStandard(null, 500, "can't create the suers"));
  }

  return setResponseForAuth(res, newUser, "Register successfully");
};

/**
 * @name    login
 * @returns response with status 200 and cookies with tokens and json data
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  const invalidMessage = "Invalid email or password";
  if (!user || !user.password) {
    return res.status(401).json(jsonStandard(null, 401, invalidMessage));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json(jsonStandard(null, 401, invalidMessage));
  }
  return setResponseForAuth(res, user, "login Successfully");
};

/**
 * @name        loginWithGoogle
 * @description login with google OAuth Protocol with Google service using passport.js
 * @returns     response with status 200 and cookies with tokens and json data
 */
const loginWithGoogle = async (req: Request, res: Response) => {
  const user = req.user;

  const [token, cookieOfToken, refreshToken, cookieOfRefreshToken] =
    setUserTokens(user);

  res.cookie(Tokens.token, token, cookieOfToken as CookieOptions);
  res.cookie(
    Tokens.refreshToken,
    refreshToken,
    cookieOfRefreshToken as CookieOptions
  );
  return res.redirect(CLIENT_URL + "/success-google-auth");
};

/**
 * @name        loginWIthMicrosoft
 * @description login with microsoft OAuth Protocol with Microsoft service using passport.js
 * @returns     response with status 200 and cookies with tokens and json data
 */
// const loginWIthMicrosoft = async (req: Request, res: Response) => {
//   const user = req.user;
//   return setResponseForAuth(res, user, "login with microsoft Successfully");
// };
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

/**
 * @name        updateToken
 * @description update token with refresh token
 */
const updateToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies[Tokens.refreshToken];

  if (!refreshToken) {
    return res.status(401).json(jsonStandard(null, 401, "Unauthorized"));
  }

  const decodedRefreshToken = jwtRefreshService.decodeToken(
    refreshToken
  ) as JwtPayload;

  if (!decodedRefreshToken) {
    return res.status(401).json(jsonStandard(null, 401, "Unauthorized"));
  }

  if (decodedRefreshToken.id !== req.user.id) {
    return res.status(401).json(jsonStandard(null, 401, "Unauthorized"));
  }

  const token = jwtService.generateToken({ id: req.user.id });
  const user = req.user;
  return res
    .cookie(Tokens.token, token, tokenSetting(defaultMaxAgeToken))
    .status(200)
    .json(jsonStandard({ data: userInResponse(user) }, 200, "Token updated"));
};

export {
  register,
  login,
  loginWithGoogle,
  updateToken,
  logout,
  // loginWIthMicrosoft,
};

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
  grade: user.grade,
  role: user.role,
  specialization: user.specialization,
});

// what will be returned to but in create data for the user data
const userInCreate = ({
  email,
  name,
  image,
}: {
  email: string;
  name: string;
  image: string;
}) => ({
  name,
  email,
  image: image || "",
  role: roles.student,
  grade: grades.first,
});

/**
 * @name setResponseForAuth
 * @param res
 * @param user
 * @param message
 * @returns response with handled tokens and json data
 */

const setUserTokens = (user: user) => {
  const payload = {
    id: user.id,
  };
  const token = jwtService.generateToken(payload);
  const refreshToken = jwtRefreshService.generateToken(payload);

  const cookieOfToken = tokenSetting(defaultMaxAgeToken);
  const cookieOfRefreshToken = tokenSetting(defaultMaxAgeRefreshToken);
  return [token, cookieOfToken, refreshToken, cookieOfRefreshToken];
};

export const setResponseForAuth = (
  res: Response,
  user: user,
  message: string
): Response => {
  const payload = {
    id: user.id,
  };
  const [token, cookieOfToken, refreshToken, cookieOfRefreshToken] =
    setUserTokens(user);

  const returnedUser = userInResponse(user);

  return res
    .cookie(Tokens.token, token, cookieOfToken as CookieOptions)
    .cookie(
      Tokens.refreshToken,
      refreshToken,
      cookieOfRefreshToken as CookieOptions
    )
    .status(200)
    .json(jsonStandard({ data: returnedUser }, 200, message));
};
