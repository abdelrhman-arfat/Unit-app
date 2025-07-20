import { Request, Response } from "express";
import { taskService } from "../services/TaskService.js";
import { subjectService } from "../services/SubjectService.js";
import { setResponse } from "../utils/jsonStander.js";
import { grades, specializations, user } from "@prisma/client";
import { checkIfInEnum } from "../utils/checkIfInEnum.js";

// ------------------------------ Controllers --------------------------------

/**
  @name    createTask
  @desc    Create a new task by creator (from req.user)
*/
export const createTask = async (req: Request, res: Response) => {
  const { title, description, startDate, endDate, subjectId } = req.body;

  if (new Date(endDate) < new Date(startDate)) {
    return setResponse(
      res,
      { data: null },
      400,
      "End date must be greater than start date"
    );
  }

  const subject = await subjectService.getById(subjectId);
  if (!subject)
    return setResponse(res, { data: null }, 404, "Subject not found");

  const creatorId = req.user.id;
  const task = await taskService.createTask({
    title,
    description,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    subjectId,
    creatorId,
  });

  return setResponse(res, { data: task }, 201, "Task created");
};

/**
  @name    getAllTasks
  @desc    Get all tasks with optional filters (subjectId, grade, specialization)
*/
export const getAllTasks = async (req: Request, res: Response) => {
  const filters = req.query;
  const where: any = {};

  if (filters.subjectId) {
    where.subjectId = Number(filters.subjectId);
  }

  if (filters.grade) {
    checkIfInEnum(filters.grade as string, grades, "grade");
    where.subject = { grade: filters.grade };
  }

  if (filters.specialization) {
    checkIfInEnum(
      filters.specialization as string,
      specializations,
      "specialization"
    );
    where.subject = {
      ...(where.subject || {}),
      specialization: filters.specialization,
    };
  }

  const tasks = await taskService.getAllTasks(where);
  return setResponse(res, { data: tasks }, 200, "Tasks fetched");
};

/**
  @name    getTasksForMe
  @desc    Get tasks created by the current user (creator)
*/
export const getTasksForMe = async (req: Request, res: Response) => {
  const user = req.user as user;
  const subjectId = req.query.subjectId
    ? Number(req.query.subjectId)
    : undefined;
  const tasks = await taskService.getTasksByUser(user, subjectId);
  return setResponse(res, { data: tasks }, 200, "Tasks for user fetched");
};

/**
  @name    updateTask
  @desc    Update task title and endDate
*/
export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, endDate } = req.body;

  const task = await taskService.getTaskById(id);
  if (!task) return setResponse(res, { data: null }, 404, "Task not found");

  if (title) task.title = title;
  if (description) task.description = description;
  if (endDate && !testDatePattern(endDate)) {
    return setResponse(
      res,
      { data: null },
      400,
      "Date must be in format yyyy-mm-dd"
    );
  }
  if (endDate) {
    const updatedDate = new Date(endDate);
    if (updatedDate < task.startDate) {
      return setResponse(
        res,
        { data: null },
        400,
        "End date must be greater than start date"
      );
    }
    if (updatedDate < new Date()) {
      return setResponse(
        res,
        { data: null },
        400,
        "End date must be greater than current date"
      );
    }
    task.endDate = updatedDate;
  }

  const updated = await taskService.updateTask(id, task);
  return setResponse(res, { data: updated }, 200, "Task updated");
};

/**
  @name    deleteTask
  @desc    Delete task by ID
*/
export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const exists = await taskService.getTaskById(id);
  if (!exists) return setResponse(res, { data: null }, 404, "Task not found");

  await taskService.deleteTask(id);
  return setResponse(res, { data: null }, 200, "Task deleted");
};

// ------------------------------------- Utils --------------------------------

const testDatePattern = (data) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(data);
};
