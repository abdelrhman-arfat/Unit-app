import { Request, Response } from "express";
import { subjectService } from "../services/SubjectService.js";
import { setResponse } from "../utils/jsonStander.js";
import { checkIfInEnum } from "../utils/checkIfInEnum.js";
import { grades, specializations } from "@prisma/client";

/**
 * @name       getAllSubjects
 * @description Get all subjects
 */
export const getAllSubjects = async (req: Request, res: Response) => {
  const subjects = await subjectService.getAll();
  return setResponse(res, { data: subjects }, 200, "Subjects fetched");
};

/**
 * @name       getSubjectById
 * @description Get subject by ID
 */
export const getSubjectById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const subject = await subjectService.getById(id);
  if (!subject) {
    return setResponse(res, { data: null }, 404, "Subject not found");
  }
  return setResponse(res, { data: subject }, 200, "Subject found");
};

/**
 * @name       createSubject
 * @description Create new subject
 */
export const createSubject = async (req: Request, res: Response) => {
  const { name, grade, specialization } = req.body;

  checkIfInEnum(grade, grades, "grade");
  checkIfInEnum(specialization, specializations, "specialization");

  const subject = await subjectService.create({
    name: String(name).toLowerCase(),
    grade,
    specialization,
  });

  return setResponse(res, { data: subject }, 201, "Subject created");
};

/**
 * @name       updateSubject
 * @description Update subject by ID
 */
export const updateSubject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, grade, specialization } = req.body;
  const subject = await subjectService.update(id, {
    name,
    grade,
    specialization,
  });
  return setResponse(res, { data: subject }, 200, "Subject updated");
};

/**
 * @name       deleteSubject
 * @description Delete subject by ID
 */
export const deleteSubject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const subject = await subjectService.delete(id);
  return setResponse(res, { data: subject }, 200, "Subject deleted");
};

/**
 * @name       getSubjectsByUserData
 * @description Delete subject by ID
 */
export const getSubjectsByUserData = async (req: Request, res: Response) => {
  const grade = req.user.grade;
  const specialization = req.user.specialization as specializations;

  checkIfInEnum(grade, grades, "grade");
  checkIfInEnum(specialization, specializations, "specialization");

  const subjects = await subjectService.getSubjectByUserData(
    grade,
    specialization
  );
  return setResponse(res, { data: subjects }, 200, "Subjects by grade");
};
