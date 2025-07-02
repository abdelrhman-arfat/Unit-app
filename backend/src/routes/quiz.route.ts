import { Router } from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllForUser,
} from "../controller/quiz.controller.js";

import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import {
  validateCreateQuiz,
  validateUpdateQuiz,
  validateQuizId,
} from "../validation/quiz.validate.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";

const router = Router();

router
  .use(asyncWrapper(isLoginMiddleware))
  .get("/", asyncWrapper(getAllQuizzes))
  .get("/by-user", asyncWrapper(getAllForUser))
  .get(
    "/by-id/:id",
    validateQuizId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(getQuizById)
  );

router
  .use(asyncWrapper(isLoginMiddleware), asyncWrapper(isAdminMiddleware))
  .post(
    "/",
    validateCreateQuiz,
    asyncWrapper(validationMiddleware),
    asyncWrapper(createQuiz)
  )
  .put(
    "/update-quiz/:id",
    validateUpdateQuiz,
    asyncWrapper(validationMiddleware),
    asyncWrapper(updateQuiz)
  )
  .delete(
    "/delete-quiz/:id",
    validateQuizId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(deleteQuiz)
  );

export { router as quizRouter };
