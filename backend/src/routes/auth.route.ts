import { Router } from "express";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { login, logout, register } from "../controller/auth.controller.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth.validate.js";
const router = Router();

router
  .post("/login", loginValidation, validationMiddleware, asyncWrapper(login))
  .post(
    "/register",
    registerValidation,
    validationMiddleware,
    asyncWrapper(register)
  )
  .get("/logout", asyncWrapper(isLoginMiddleware), asyncWrapper(logout));
export { router as authRouter };
