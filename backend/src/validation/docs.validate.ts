import { grades, specializations } from "@prisma/client";
import { body, param } from "express-validator";

export const validateCreateDoc = [
  body("title").isString().notEmpty().withMessage("title is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("link").isURL().withMessage("link must be a valid URL"),
  body("subjectId")
    .isInt({ min: 1 })
    .withMessage("subjectId must be a valid integer"),
];

export const validateSubjectId = [
  param("subjectId")
    .notEmpty()
    .withMessage("subject id is required")
    .isInt({ min: 1 })
    .withMessage("subjectId must be a valid integer"),
];

export const validateGrade = [
  param("grade")
    .notEmpty()
    .withMessage("grade is required")
    .custom((value) => Object.values(grades).includes(value))
    .withMessage("grade must be one of: " + Object.values(grades).join(", ")),
];

export const validateSpecialization = [
  param("specialization")
    .notEmpty()
    .withMessage("specialization is required")
    .custom((value) => Object.values(specializations).includes(value))
    .withMessage(
      "specialization must be one of: " +
        Object.values(specializations).join(", ")
    ),
];
