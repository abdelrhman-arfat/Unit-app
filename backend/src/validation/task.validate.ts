import { body, param, query } from "express-validator";
import { grades, specializations } from "@prisma/client";

export const validateCreateTask = [
  body("title").isString().notEmpty().withMessage("title is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("startDate")
    .isISO8601()
    .toDate()
    .withMessage("startDate must be a valid date"),
  body("endDate")
    .isISO8601()
    .toDate()
    .withMessage("endDate must be a valid date"),
  body("subjectId")
    .isInt({ min: 1 })
    .withMessage("subjectId must be a valid integer"),
];

export const validateTaskId = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isInt({ min: 1 })
    .withMessage("Task ID must be a valid integer"),
];

export const validateGrade = [
  param("grade")
    .notEmpty()
    .withMessage("Grade is required")
    .custom((value) => Object.values(grades).includes(value))
    .withMessage(`Grade must be one of: ${Object.values(grades).join(", ")}`),
];

export const validateSpecialization = [
  param("specialization")
    .notEmpty()
    .withMessage("Specialization is required")
    .custom((value) => Object.values(specializations).includes(value))
    .withMessage(
      `Specialization must be one of: ${Object.values(specializations).join(", ")}`
    ),
];
