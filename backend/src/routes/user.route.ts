import { Router } from "express";
import {
  getAllUsers,
  getUsersByCommunity,
  getMe,
} from "../controller/user.controller.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";

const router = Router();

router
  .use(asyncWrapper(isLoginMiddleware))
  .get("/get-me", asyncWrapper(getMe))
  .get("/all-users", asyncWrapper(isAdminMiddleware), asyncWrapper(getAllUsers))
  // TODO Test with postman after create community route and controller
  .get("/community/:communityName", asyncWrapper(getUsersByCommunity));

export { router as userRouter };
