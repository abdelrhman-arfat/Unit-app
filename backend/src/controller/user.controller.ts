import { userService } from "../services/UserService.js";
import { Request, Response } from "express";
import { setResponse } from "../utils/jsonStander.js";
import { grades, roles, specializations } from "@prisma/client";
import setPagination, { getCountOfPages } from "../utils/setPagination.js";
import { checkIfInEnum } from "../utils/checkIfInEnum.js";
import { communityService } from "../services/CommunityService.js";

// ------------------------------ Controllers --------------------------------
/**
 * @param  req work with dependency injection take request body data
 * @param  res work with dependency injection to return the response
 */

/**
 * @name    getAllUsers
  @desc    Get all users (with optional filters)
*/
const getAllUsers = async (req: Request, res: Response) => {
  const [skip, limit] = setPagination(req);

  const filters = req.query;
  const where: any = {};

  if (filters.email) {
    where.email = { startsWith: filters.email };
  }

  if (filters.grade) {
    checkIfInEnum(filters.grade as string, grades, "grade");
    where.grade = filters.grade;
  }

  if (filters.specialization) {
    checkIfInEnum(
      filters.specialization as string,
      specializations,
      "specialization"
    );
    where.specialization = filters.specialization;
  }

  if (filters.role) {
    checkIfInEnum(filters.role as string, roles, "role");
    where.role = filters.role;
  }
  const [users, userCount] = await Promise.all([
    userService.getAllUsers(where, skip, limit),
    userService.getUsersPageAvailable(where),
  ]);
  const pages = getCountOfPages(limit, userCount);
  return setResponse(
    res,
    {
      data: users,
      pages,
    },
    200,
    "Users fetched"
  );
};

/**
 * @name deleteUserById
 * @description Update user role by id
 */
const deleteUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const existsUser = await userService.getUserById(id);
  if (!existsUser) {
    return setResponse(res, { data: null }, 404, "User not found");
  }
  await userService.deleteUserById(id);
  return setResponse(res, { data: null }, 200, "User deleted");
};
/**
 * @name updateUserRole
 * @description Update user role by id
 */
const updateUserRole = async (req: Request, res: Response) => {
  const message = "You are not allowed to change";
  const { role, id } = req.body;
  checkIfInEnum(role, roles, "role");
  const userExits = await userService.getUserById(id);
  if (!userExits) {
    return setResponse(res, { data: null }, 404, "User not found");
  }

  // not allowed to change
  const notAllowedToChange: roles[] = [
    roles.admin,
    roles.doctor,
    roles.assistant,
  ];
  if (notAllowedToChange.includes(userExits.role) || userExits.role === role) {
    return setResponse(res, { data: null }, 403, message);
  }

  await userService.updateUserRole(id, role);
  return setResponse(res, { data: null }, 200, "User role updated");
};

/**
 * @name        getMe
 * @description getUserData
 */

const getMe = (req: Request, res: Response) => {
  const user = req.user;
  return setResponse(res, { data: user }, 200, "User fetched");
};

/**
 * @name        updateMyProfile
 * @description update user profile
 */
const updateMyProfile = async (req: Request, res: Response) => {
  const userSender = req.user;
  const { name, specialization, grade, community } = req.body;
  if (specialization)
    checkIfInEnum(specialization, specializations, "specialization");
  userSender.specialization = specialization;
  if (grade) {
    checkIfInEnum(grade, grades, "grade");
    userSender.grade = grade;
  }
  if (community) {
    const existsCommunity =
      await communityService.getCommunityByName(community);
    if (!existsCommunity) {
      return setResponse(res, { data: null }, 404, "Community not found");
    }
    userSender.communityName = community;
  }
  if (name) userSender.name = name;
  const user = await userService.updateUserById(
    String(userSender.id),
    userSender
  );
  return setResponse(res, { data: user }, 200, "User profile updated");
};
/**
  @name    getUsersByCommunity
  @desc    Get users by community name
*/
const getUsersByCommunity = async (req: Request, res: Response) => {
  const { communityName } = req.params;
  const [skip, limit] = setPagination(req);

  const [users, userCount] = await Promise.all([
    userService.getUsersByCommunity(communityName, skip, limit),
    userService.getUsersPageAvailable({ communityName }),
  ]);
  const pages = getCountOfPages(limit, userCount);

  return setResponse(
    res,
    {
      data: users,
      pages,
    },
    200,
    "Users fetched by community"
  );
};

export {
  getAllUsers,
  getUsersByCommunity,
  getMe,
  deleteUserById,
  updateUserRole,
  updateMyProfile,
};

// ------------------------------ Utils --------------------------------
