import { body, param, query } from "express-validator";
import { grades, specializations } from "@prisma/client";

export const validateCreateTask = [
  body("title").isString().notEmpty().withMessage("title is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("startDate")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Start date must be in YYYY-MM-DD format")
    .custom((value) => {
      const start = new Date(value + "T00:00:00");
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (start < now) {
        throw new Error("Start date must be in the future");
      }
      return true;
    }),
  body("endDate")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("End date must be in YYYY-MM-DD format")
    .custom((value, { req }) => {
      const start = new Date(req.body.startDate + "T00:00:00");
      const end = new Date(value + "T00:00:00");
      if (end <= start) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("subjectId")
    .isInt({ min: 1 })
    .withMessage("subjectId must be a valid integer"),
];

export const validateUpdateTask = [
  param("id").isInt({ min: 1 }).withMessage("Task ID must be a valid integer"),

  body("title").optional().isString().withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("endDate").optional(),

  body("startDate")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Start date must be in YYYY-MM-DD format")
    .custom((value, { req }) => {
      const start = new Date(req.body.startDate + "T00:00:00");
      const end = new Date(value + "T00:00:00");
      if (end <= start) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
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
