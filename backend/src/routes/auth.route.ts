import { Router } from "express";
import { body } from "express-validator";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { login, logout, register } from "../controller/auth.controller.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
const router = Router();

const loginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
const registerValidation = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

router
  .post("/login", loginValidation, validationMiddleware, asyncWrapper(login))
  .post(
    "/register",
    registerValidation,
    validationMiddleware,
    asyncWrapper(register)
  )
  .get("/logout", asyncWrapper(logout));
export { router };
