import { Router } from "express";
import {
  getAllDocs,
  getDocById,
  createDoc,
  updateDoc,
  deleteDoc,
  getDocsBySubjectId,
  getDocsForTheUser,
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
  .use(asyncWrapper(isLoginMiddleware))
  .get("/", asyncWrapper(getAllDocs))
  .get("/by-user", asyncWrapper(getDocsForTheUser))
  .get("/by-id/:id", asyncWrapper(getDocById))
  .get(
    "/by-subject/:subjectId",
    validateSubjectId,
    asyncWrapper(validationMiddleware),
    asyncWrapper(getDocsBySubjectId)
  );

router
  .use(asyncWrapper(isLoginMiddleware), asyncWrapper(isAdminMiddleware))
  .post(
    "/",
    validateCreateDoc,
    asyncWrapper(validationMiddleware),
    asyncWrapper(createDoc)
  )
  .put("/update-docs/:id", asyncWrapper(updateDoc))
  .delete("/delete-docs/:id", asyncWrapper(deleteDoc));

export { router as docsRouter };
