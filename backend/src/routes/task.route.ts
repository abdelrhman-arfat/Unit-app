import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTasksForMe,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
import {
  validateCreateTask,
  validateTaskId,
} from "../validation/task.validate.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

const router = Router();

// Routes available for all logged-in users
router.use(asyncWrapper(isLoginMiddleware));
router.get("/", asyncWrapper(getAllTasks));
router.get("/my-tasks", asyncWrapper(getTasksForMe));

// Routes only for admins
router.use(asyncWrapper(isAdminMiddleware));
router.post(
  "/",
  validateCreateTask,
  asyncWrapper(validationMiddleware),
  asyncWrapper(createTask)
);
router.put(
  "/update-task/:id",
  validateTaskId,
  asyncWrapper(validationMiddleware),
  asyncWrapper(updateTask)
);
router.delete(
  "/delete-task/:id",
  validateTaskId,
  asyncWrapper(validationMiddleware),
  asyncWrapper(deleteTask)
);

export { router as taskRouter };
