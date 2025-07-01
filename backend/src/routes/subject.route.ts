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
    "/:id",
    asyncWrapper(validationMiddleware),
    asyncWrapper(deleteSubject)
  )
  .put(
    "/:id",
    validateSubjectId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(updateSubject)
  );

export { router as subjectRouter };
