import { Router } from "express";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import {
  login,
  logout,
  register,
  updateToken,
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
  .get("/logout", asyncWrapper(isLoginMiddleware), asyncWrapper(logout))
  .get(
    "/refresh-token",
    asyncWrapper(isLoginMiddleware),
    asyncWrapper(updateToken)
  );
export { router as authRouter };
