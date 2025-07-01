import { body, param } from "express-validator";

export const validateCreateCommunity = [
  body("name").isString().notEmpty().withMessage("Community name is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Community description is required"),
];

export const validateUpdateCommunity = [
  param("id").isInt({ min: 1 }).withMessage("Invalid community ID"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const validateDeleteCommunity = [
  param("id").isInt({ min: 1 }).withMessage("Invalid community ID"),
];
