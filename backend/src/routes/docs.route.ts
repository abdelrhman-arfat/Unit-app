import { Router } from "express";
import {
  getAllDocs,
  getDocById,
  createDoc,
  updateDoc,
  deleteDoc,
  getDocsBySubjectId,
  getDocsByGrade,
  getDocsBySpecialization,
} from "../controller/docs.controller.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import {
  validateCreateDoc,
  validateGrade,
  validateSpecialization,
  validateSubjectId,
} from "../validation/docs.validate.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";

const router = Router();

router
  .get("/", asyncWrapper(getAllDocs))
  .get("/by-id/:id", asyncWrapper(getDocById))
  .get(
    "/by-subject/:subjectId",
    validateSubjectId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(getDocsBySubjectId)
  )
  .get(
    "/by-grade/:grade",
    validateGrade,
    asyncWrapper(validationMiddleware),
    asyncWrapper(getDocsByGrade)
  )
  .get(
    "/by-specialization/:specialization",
    validateSpecialization,
    asyncWrapper(getDocsBySpecialization)
  );

router
  .use(asyncWrapper(isLoginMiddleware), asyncWrapper(isAdminMiddleware))
  .post(
    "/",
    validateCreateDoc,
    asyncWrapper(validationMiddleware),
    asyncWrapper(createDoc)
  )
  .put("/:id", asyncWrapper(updateDoc))
  .delete("/:id", asyncWrapper(deleteDoc));

export { router as docsRouter };
