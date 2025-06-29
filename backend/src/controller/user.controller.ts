import { userService } from "../services/UserService.js";
import { Request, Response } from "express";
import { jsonStandard, setResponse } from "../utils/jsonStander.js";
import { grades, roles, specializations } from "@prisma/client";
import setPagination, { getCountOfPages } from "../utils/setPagination.js";
import { checkIfInEnum } from "../utils/checkIfInEnum.js";

// ------------------------------ Controllers --------------------------------
/**
 * @param  req work with dependency injection take request body data
 * @param  res work with dependency injection to return the response
 */

/**
  @desc    Get all users (with optional filters)
  @route   GET /api/users/all-users?email=...&grade=...&role=...&specialization=...
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
  @desc    Get users by community name
  @route   GET /api/users/community/:communityName
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

export { getAllUsers, getUsersByCommunity };

// ------------------------------ Utils --------------------------------
