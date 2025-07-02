import { body, param } from "express-validator";

export const validateCreateEvent = [
  body("title").isString().withMessage("Title is required"),
  body("description").isString().withMessage("Description is required"),
  body("link").isURL().withMessage("Link must be a valid URL"),

  // Start Date in yyyy-mm-dd format and must be after today
  body("startDate")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Start date must be in YYYY-MM-DD format")
    .custom((value) => {
      const today = new Date();
      const inputDate = new Date(value + "T00:00:00"); // add time to avoid timezone issues

      if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid date value");
      }

      // Remove time from today for comparison
      const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      if (inputDate <= todayOnly) {
        throw new Error("Start date must be in the future");
      }

      return true;
    }),

  // End Date must be in same format and after startDate
  body("endDate")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("End date must be in YYYY-MM-DD format")
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate + "T00:00:00");
      const endDate = new Date(value + "T00:00:00");

      if (endDate <= startDate) {
        throw new Error("End date must be after start date");
      }

      return true;
    }),
];

export const validateUpdateEvent = [
  param("id").isInt().withMessage("Event ID must be a number"),

  body("title").optional().isString().withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("link").optional().isURL().withMessage("Link must be a valid URL"),

  body("startDate")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Start date must be in YYYY-MM-DD format")
    .custom((value) => {
      const inputDate = new Date(value + "T00:00:00");
      const today = new Date();
      const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid start date");
      }

      if (inputDate <= todayOnly) {
        throw new Error("Start date must be in the future");
      }

      return true;
    }),

  body("endDate")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("End date must be in YYYY-MM-DD format")
    .custom((value, { req }) => {
      if (!req.body.startDate) {
        return true; // skip check if no startDate provided
      }

      const startDate = new Date(req.body.startDate + "T00:00:00");
      const endDate = new Date(value + "T00:00:00");

      if (isNaN(endDate.getTime()) || isNaN(startDate.getTime())) {
        throw new Error("Invalid date(s)");
      }

      if (endDate <= startDate) {
        throw new Error("End date must be after start date");
      }

      return true;
    }),
];

export const validateEventId = [
  param("id").isInt().withMessage("Event ID must be a number"),
];
