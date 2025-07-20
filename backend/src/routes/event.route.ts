import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controller/event.controller.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { upload } from "../config/CloudinaryConfig.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
import {
  validateCreateEvent,
  validateUpdateEvent,
  validateEventId,
} from "../validation/event.validate.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

const router = Router();

router
  .use(asyncWrapper(isLoginMiddleware))
  .get("/", asyncWrapper(getAllEvents))
  .get(
    "/by-id/:id",
    validateEventId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(getEventById)
  );

router
  .use(asyncWrapper(isLoginMiddleware), asyncWrapper(isAdminMiddleware))
  .get("/by-admin", asyncWrapper(getAllEvents))
  .post(
    "/",
    upload.single("image"),
    validateCreateEvent,
    asyncWrapper(validationMiddleware),
    asyncWrapper(createEvent)
  )
  .put(
    "/update-event/:id",
    validateUpdateEvent,
    asyncWrapper(validationMiddleware),
    asyncWrapper(updateEvent)
  )
  .delete(
    "/delete-event/:id",
    validateEventId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(deleteEvent)
  );

export { router as eventRouter };
