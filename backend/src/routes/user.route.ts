import { Router } from "express";
import {
  getAllUsers,
  getUsersByCommunity,
  getMe,
  updateUserRole,
  deleteUserById,
  updateMyProfile,
} from "../controller/user.controller.js";
import { isLoginMiddleware } from "../middleware/isLoginMiddleware.js";
import { asyncWrapper } from "../utils/AsyncWrapper.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";

const router = Router();

router
  .use(asyncWrapper(isLoginMiddleware))
  .get("/get-me", asyncWrapper(getMe))
  .get("/community/:communityName", asyncWrapper(getUsersByCommunity))
  .get("/", asyncWrapper(isAdminMiddleware), asyncWrapper(getAllUsers))
  .put("/update-my-profile", asyncWrapper(updateMyProfile))
  .put(
    "/update-role",
    asyncWrapper(isAdminMiddleware),
    asyncWrapper(updateUserRole)
  )
  .delete(
    "/delete-user/:id", // should be soft deleted or block because it has foreign keys
    asyncWrapper(isAdminMiddleware),
    asyncWrapper(deleteUserById)
  );

export { router as userRouter };
