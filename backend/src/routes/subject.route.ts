import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectById,
  getSubjectsByUserData,
  updateSubject,
} from "../controller/subject.controller.js";

import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import {
  validateCreateSubject,
  validateSubjectId,
  validateUpdateSubject,
} from "../validation/subject.validate.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";

const router = Router();

router
  .use(asyncWrapper(isLoginMiddleware))
  .get("/", asyncWrapper(getAllSubjects))
  .get("/by-id/:id", asyncWrapper(getSubjectById))
  .get(
    "/by-user",
    asyncWrapper(isLoginMiddleware),
    asyncWrapper(getSubjectsByUserData)
  );

router
  .use(asyncWrapper(isLoginMiddleware), asyncWrapper(isAdminMiddleware))
  .post(
    "/",
    validateCreateSubject,
    asyncWrapper(validationMiddleware),
    asyncWrapper(createSubject)
  )
  .delete(
    "/delete-subject/:id",
    validateSubjectId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(deleteSubject)
  ) // it should be soft delete not hard delete because it used in many places with the id tasks , quizzes , events
  .put(
    "/update-subject/:id",
    validateUpdateSubject,
    asyncWrapper(validationMiddleware),
    asyncWrapper(updateSubject)
  );

export { router as subjectRouter };
