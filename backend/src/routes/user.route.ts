import { Router } from "express";
import {
  getAllUsers,
  getUsersByCommunity,
} from "../controller/user.controller.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";

const router = Router();

router
  .use(asyncWrapper(isLoginMiddleware))
  .get("/all-users", asyncWrapper(getAllUsers))
  // TODO Test with postman after create community route and controller
  .get("/community/:communityName", asyncWrapper(getUsersByCommunity));

export { router as userRouter };
