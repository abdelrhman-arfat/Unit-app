import { Request, Response } from "express";
import { quizService } from "../services/QuizService.js";
import { setResponse } from "../utils/jsonStander.js";
import { checkIfInEnum } from "../utils/checkIfInEnum.js";
import { grades, specializations, user } from "@prisma/client";
import setPagination, { getCountOfPages } from "../utils/setPagination.js";
import { subjectService } from "../services/SubjectService.js";

/**
 * @name    createQuiz
 * @desc Create a new quiz
 */
export const createQuiz = async (req: Request, res: Response) => {
  const { title, description, subjectId, startDate, duration } = req.body;
  const creatorId = req.user.id;
  const subject = await subjectService.getById(subjectId);

  if (!subject) {
    return setResponse(res, { data: null }, 404, "Subject not found");
  }

  const quiz = await quizService.create({
    title,
    description,
    subjectId,
    creatorId,
    startDate: new Date(startDate),
    duration,
  });

  return setResponse(res, { data: quiz }, 201, "Quiz created");
};

/**
 * @name    getAllQuizzes
 * @desc Get all quizzes
 */
export const getAllQuizzes = async (req: Request, res: Response) => {
  const { grade, specialization } = req.query;
  const where: any = {};
  const [skip, limit] = setPagination(req);
  if (grade) {
    checkIfInEnum(grade as string, grades, "grade");
    where.subject = { grade: grade };
  }
  if (specialization) {
    checkIfInEnum(specialization as string, specializations, "specialization");
    where.subject = {
      ...(where.subject || {}),
      specialization: specialization,
    };
  }
  const quizzes = await quizService.getAll(where, skip, limit);
  const count = await quizService.countAll(where);
  const pages = getCountOfPages(limit, count);
  return setResponse(res, { data: quizzes, pages }, 200, "Quizzes fetched");
};

/**
 * @name    getAllForUser
 * @desc Get quiz by ID
 */
export const getAllForUser = async (req: Request, res: Response) => {
  const user = req.user as user;
  const subjectId = req.query.subjectId;
  const where = {
    subject: {
      grade: user.grade,
      specialization: user.specialization,
    },
    ...(subjectId && { subjectId: Number(subjectId) }),
  };
  const [skip, limit] = setPagination(req);
  const quizzes = await quizService.getAllForUser(where, skip, limit);
  const count = await quizService.countAll(where);
  const pages = getCountOfPages(limit, count);
  return setResponse(res, { data: quizzes, pages }, 200, "Quizzes fetched");
};
/**
 * @name    getQuizById
 * @desc Get quiz by ID
 */
export const getQuizById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const quiz = await quizService.getById(id);
  if (!quiz) {
    return setResponse(res, { data: null }, 404, "Quiz not found");
  }
  return setResponse(res, { data: quiz }, 200, "Quiz fetched");
};

/**
 * @name    updateQuiz
 * @desc Update quiz
 */
export const updateQuiz = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const quiz = await quizService.getById(id);
  if (!quiz) {
    return setResponse(res, { data: null }, 404, "Quiz not found");
  }
  const { title, description, subjectId, startDate, duration } = req.body;

  const data: any = {};
  if (title) data.title = title;
  if (description) data.description = description;
  if (subjectId) data.subjectId = subjectId;
  if (startDate) data.startDate = new Date(startDate);
  if (duration) data.duration = duration;

  const updated = await quizService.update(id, data);
  return setResponse(res, { data: updated }, 200, "Quiz updated");
};

/**
 * @name    deleteQuiz
 * @desc Delete quiz
 */
export const deleteQuiz = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const quiz = await quizService.getById(id);
  if (!quiz) {
    return setResponse(res, { data: null }, 404, "Quiz not found");
  }
  await quizService.delete(id);
  return setResponse(res, { data: null }, 200, "Quiz deleted");
};
