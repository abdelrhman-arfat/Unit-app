import { body, param } from "express-validator";

// regex pattern for YYYY-MM-DD
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const validateCreateQuiz = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("startDate")
    .matches(datePattern)
    .withMessage("Start date must be in YYYY-MM-DD format")
    .custom((value) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const startDate = new Date(value + "T00:00:00");
      if (startDate < now) {
        throw new Error("Start date must be in the future");
      }
      return true;
    }),
  body("duration")
    .isInt({ gt: 0 })
    .withMessage("Duration must be a positive integer"),
  body("subjectId")
    .isInt({ gt: 0 })
    .withMessage("Subject ID must be a valid integer"),
];

export const validateUpdateQuiz = [
  param("id").isInt().withMessage("Quiz ID must be a number"),
  body("title").optional().isString().withMessage("Title must be a string"),
  body("description").optional().isString(),
  body("startDate")
    .optional()
    .matches(datePattern)
    .withMessage("Start date must be in YYYY-MM-DD format")
    .custom((value) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const startDate = new Date(value + "T00:00:00");
      if (startDate < now) {
        throw new Error("Start date must be in the future");
      }
      return true;
    }),
  body("duration")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Duration must be a positive integer"),
  body("subjectId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Subject ID must be a valid integer"),
  body("creatorId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Creator ID must be a valid integer"),
];

export const validateQuizId = [
  param("id").isInt().withMessage("Quiz ID must be a valid number"),
];
