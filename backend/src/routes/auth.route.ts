import { Router } from "express";
import passport from "passport";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import {
  login,
  logout,
  register,
  updateToken,
  loginWithGoogle,
 
} from "../controller/auth.controller.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth.validate.js";
const router = Router();

router
  .post(
    "/login",
    loginValidation,
    asyncWrapper(validationMiddleware),
    asyncWrapper(login)
  )
  .post(
    "/register",
    registerValidation,
    asyncWrapper(validationMiddleware),
    asyncWrapper(register)
  )
  .get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    asyncWrapper(loginWithGoogle)
  )

  .get("/logout", asyncWrapper(isLoginMiddleware), asyncWrapper(logout))
  .get(
    "/refresh-token",
    asyncWrapper(isLoginMiddleware),
    asyncWrapper(updateToken)
  );
export { router as authRouter };

/**
 *  .get(
    "/microsoft",
    passport.authenticate("microsoft", {
      prompt: "select_account",
      session: false,
    })
  )
  .get(
    "/microsoft/callback",
    passport.authenticate("microsoft", {
      session: false,
      failureRedirect: "/login",
    }),
    asyncWrapper(loginWIthMicrosoft)
  )
 */
