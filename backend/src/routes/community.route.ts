import { Router } from "express";
import {
  getAllCommunities,
  getCommunityById,
  getCommunityByName,
  createCommunity,
  updateCommunityById,
  deleteCommunityById,
} from "../controller/community.controller.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";

import {
  validateCreateCommunity,
  validateUpdateCommunity,
  validateDeleteCommunity,
} from "../validation/community.validate.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { upload } from "../config/CloudinaryConfig.js";

const router = Router();

router
  .use(asyncWrapper(isLoginMiddleware))
  .get("/", asyncWrapper(getAllCommunities))
  .get("/by-id/:id", asyncWrapper(getCommunityById))
  .get("/by-name/:name", asyncWrapper(getCommunityByName));
router
  .use(asyncWrapper(isLoginMiddleware), asyncWrapper(isAdminMiddleware))
  .post(
    "/",
    upload.single("image"),
    validateCreateCommunity,
    asyncWrapper(validationMiddleware),
    asyncWrapper(createCommunity)
  )
  .put(
    "/update-community/:id",
    validateUpdateCommunity,
    asyncWrapper(validationMiddleware),
    asyncWrapper(updateCommunityById)
  )
  .delete(
    "/delete-community/:id",
    validateDeleteCommunity,
    asyncWrapper(validationMiddleware),
    asyncWrapper(deleteCommunityById)
  );

export { router as communityRouter };
