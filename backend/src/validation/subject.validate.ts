import { body, param } from "express-validator";
import { grades, specializations } from "@prisma/client";

export const validateSubjectId = [
  param("id").isInt({ min: 1 }).withMessage("id must be a valid integer"),
];
export const validateUpdateSubject = [
  param("id").isInt({ min: 1 }).withMessage("id must be a valid integer"),
  body("name").optional().isString().withMessage("name must be a string"),
  body("grade")
    .optional()
    .custom((value) => Object.values(grades).includes(value))
    .withMessage("grade must be one of: " + Object.values(grades).join(", ")),
  body("specialization")
    .optional()
    .custom((value) => Object.values(specializations).includes(value))
    .withMessage(
      "specialization must be one of: " +
        Object.values(specializations).join(", ")
    ),
];

export const validateCreateSubject = [
  body("name").isString().notEmpty().withMessage("name is required"),
  body("grade")
    .notEmpty()
    .withMessage("grade is required")
    .custom((value) => Object.values(grades).includes(value))
    .withMessage("grade must be one of: " + Object.values(grades).join(", ")),
  body("specialization")
    .custom((value) => Object.values(specializations).includes(value))
    .withMessage(
      "specialization must be one of: " +
        Object.values(specializations).join(", ")
    )
    .notEmpty()
    .withMessage("specialization is required"),
];
