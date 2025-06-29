import { Request, Response } from "express";
import { docsService } from "../services/DocsService.js";
import { setResponse } from "../utils/jsonStander.js";
import setPagination from "../utils/setPagination.js";

// لو محتاجهم للـ enum validation
import { grades, specializations } from "@prisma/client";
import { checkIfInEnum } from "../utils/checkIfInEnum.js";
import { subjectService } from "../services/SubjectService.js";

/**
  @desc    Get all documentation with filters
  @route   GET /api/docs?title=...&subjectId=...&uploaderId=...
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
  @desc    Get single documentation by ID
  @route   GET /api/docs/:id
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
  @desc    Create new documentation
  @route   POST /api/docs
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
  @desc    Update existing documentation
  @route   PUT /api/docs/:id
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
  @desc    Soft delete documentation
  @route   DELETE /api/docs/:id
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
  @desc    Get docs by subjectId
  @route   GET /api/docs/by-subject/:subjectId
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
  @desc    Get docs by grade
  @route   GET /api/docs/by-grade/:grade
*/
export const getDocsByGrade = async (req: Request, res: Response) => {
  const grade = req.params.grade as grades;
  checkIfInEnum(grade, grades, "grade");
  const docs = await docsService.getDocsByGrade(grade);
  return setResponse(res, { data: docs }, 200, "Docs by grade fetched");
};

/**
  @desc    Get docs by specialization
  @route   GET /api/docs/by-specialization/:specialization
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
