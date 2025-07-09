import { Request, Response } from "express";
import { docsService } from "../services/DocsService.js";
import { setResponse } from "../utils/jsonStander.js";
import setPagination from "../utils/setPagination.js";

import { grades, specializations } from "@prisma/client";
import { checkIfInEnum } from "../utils/checkIfInEnum.js";
import { subjectService } from "../services/SubjectService.js";

// ------------------------------ Controllers --------------------------------
/**
 * @param  req work with dependency injection take request body data
 * @param  res work with dependency injection to return the response
 */

/**
  @name    getAllDocs
  @desc    Get all documentation with filters
*/
export const getAllDocs = async (req: Request, res: Response) => {
  const filters = req.query;
  const [skip, limit] = setPagination(req);
  const where: any = { isDeleted: false };
  if (filters.specialization) {
    checkIfInEnum(
      filters.specialization as string,
      specializations,
      "specialization"
    );
    where.subject = {
      specialization: filters.specialization,
    };
  }

  if (filters.grade) {
    checkIfInEnum(filters.grade as string, grades, "grade");
    where.subject = {
      grade: filters.grade,
    };
  }

  if (filters.title) {
    where.title = { contains: filters.title, mode: "insensitive" };
  }
  if (filters.subjectId) {
    where.subjectId = Number(filters.subjectId);
  }
  if (filters.uploaderEmail) {
    where.uploader = {
      email: {
        startsWith: filters.uploaderEmail,
      },
    };
  }

  const [docs, totalDocs] = await Promise.all([
    docsService.getAllDocs(where, skip, limit),
    docsService.countDocs(where),
  ]);

  const pages = Math.ceil(totalDocs / limit);
  return setResponse(res, { data: docs, pages }, 200, "Docs fetched");
};

/**
 * @name    getDocsForTheUser
 * @desc    Get all documentation for the user
 */

export const getDocsForTheUser = async (req: Request, res: Response) => {
  const user = req.user as any;
  const { subjectId, title } = req.query;
  let where = {};
  if (subjectId) where = { ...where, subjectId: Number(subjectId) };
  if (title) {
    where = { ...where, title: { startsWith: title.toString().toLowerCase() } };
  }

  const docs = await docsService.getDocsForTheUser(user, where);
  return setResponse(res, { data: docs }, 200, "Docs for the user fetched");
};

/**
  @name    getDocById
  @desc    Get single documentation by ID
*/
export const getDocById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const doc = await docsService.getDocById(id);
  if (!doc) {
    return setResponse(res, { data: null }, 404, "Doc not found");
  }
  return setResponse(res, { data: doc }, 200, "Doc found");
};

/**
  @name    createDoc
  @desc    Create new documentation
*/
export const createDoc = async (req: Request, res: Response) => {
  const { title, subjectId, link, description } = req.body;
  const subject = await subjectService.getById(subjectId);
  if (!subject) {
    return setResponse(res, { data: null }, 404, "Subject not found");
  }
  const uploaderId = req.user.id;
  const doc = await docsService.createDoc({
    title,
    subjectId,
    link,
    description,
    uploaderId,
  });
  return setResponse(res, { data: doc }, 201, "Doc created");
};

/**
  @name    updateDoc
  @desc    Update existing documentation
*/
export const updateDoc = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, link, description } = req.body;
  const docs = await docsService.getDocById(id);

  if (!docs) {
    return setResponse(res, { data: null }, 404, "Doc not found");
  }

  if (title) {
    docs.title = title;
  }
  if (link) {
    docs.link = link;
  }
  if (description) {
    docs.description = description;
  }

  await docsService.updateDoc(id, docs);

  return setResponse(res, { data: docs }, 200, "Doc updated");
};

/**
  @name    deleteDoc
  @desc    Soft delete documentation
*/
export const deleteDoc = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const isExists = await docsService.getDocById(id);
  if (!isExists) {
    return setResponse(res, { data: null }, 404, "Doc not found");
  }

  const doc = await docsService.softDeleteDoc(id);
  return setResponse(res, { data: doc }, 200, "Doc deleted");
};

/**
  @name    getDocsBySubjectId
  @desc    Get docs by subjectId
*/
export const getDocsBySubjectId = async (req: Request, res: Response) => {
  const subjectId = Number(req.params.subjectId);
  const subject = await subjectService.getById(subjectId);
  if (!subject) {
    return setResponse(res, { data: null }, 404, "Subject not found");
  }
  const docs = await docsService.getDocsBySubjectId(subjectId);
  if (!docs) {
    return setResponse(res, { data: null }, 404, "Docs not found");
  }
  return setResponse(res, { data: docs }, 200, "Docs by subject fetched");
};

/**
  @name    getDocsByGrade
  @desc    Get docs by grade
*/
export const getDocsByGrade = async (req: Request, res: Response) => {
  const grade = req.params.grade as grades;
  checkIfInEnum(grade, grades, "grade");
  const docs = await docsService.getDocsByGrade(grade);
  return setResponse(res, { data: docs }, 200, "Docs by grade fetched");
};

/**
  @name    getDocsBySpecialization
  @desc    Get docs by specialization
*/
export const getDocsBySpecialization = async (req: Request, res: Response) => {
  const specialization = req.params.specialization as specializations;
  checkIfInEnum(specialization, specializations, "specialization");
  const docs = await docsService.getDocsBySpecialization(specialization);
  return setResponse(
    res,
    { data: docs },
    200,
    "Docs by specialization fetched"
  );
};
