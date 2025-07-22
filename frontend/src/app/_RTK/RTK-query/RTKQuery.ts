import { API_ULR } from "@/app/constants/ENV";
import { Docs } from "@/app/types/Docs";
import { Event } from "@/app/types/Event";
import { grades } from "@/app/types/grades";
import { Quiz } from "@/app/types/Quiz";
import { roles } from "@/app/types/roles";
import { specializations } from "@/app/types/Specialization";
import { Subject } from "@/app/types/Subject";
import { Task } from "@/app/types/Tasks";
import { User } from "@/app/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TResponse<T> = {
  message: string;
  data: {
    data: T;
    pages?: number;
  };
  error?: string;
  status: number;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ULR,
    credentials: "include",
  }),
  endpoints: (b) => ({
    // ----------------------- Auth -----------------------

    // ----------------------- USERS -----------------------
    getMe: b.query<TResponse<User>, void>({
      query: () => "/user/get-me",
    }),

    getAllUsers: b.query<
      TResponse<User[]>,
      {
        page?: number;
        limit?: number;
        email?: string;
        specialization?: specializations;
        grade?: grades;
        role?: roles;
      }
    >({
      query: ({ page, limit, email, specialization, grade, role }) =>
        `/user?${limit ? `limit=${limit}&` : ""}${page ? `page=${page}&` : ""}${email ? `email=${email}&` : ""}${specialization ? `specialization=${specialization}&` : ""}${grade ? `grade=${grade}&` : ""}${role ? `role=${role}&` : ""}`.replace(
          /&$/,
          ""
        ),
    }),

    // ----------------------- Events -----------------------
    getAllEvents: b.query<
      TResponse<Event[]>,
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }) =>
        `/event?${page && `page=${page}`}&${limit && `limit=${limit}`}`,
    }),
    // ----------------------- Docs -----------------------
    getAllDocs: b.query<TResponse<Docs[]>, void>({
      query: () => `/docs`,
    }),
    getAllDocsForTheUser: b.query<TResponse<Docs[]>, { subjectId?: number }>({
      query: ({ subjectId }) =>
        `/docs/by-user${subjectId ? `?subjectId=${subjectId}` : ""}`,
    }),
    // ----------------------- Quizzes ------------------------
    getAllQuizzesForTheUser: b.query<TResponse<Quiz[]>, { subjectId?: number }>(
      {
        query: ({ subjectId }) =>
          `/quiz/by-user${subjectId ? `?subjectId=${subjectId}` : ""}`,
      }
    ),
    // ----------------------- Subjects -----------------------
    getAllSubjects: b.query<TResponse<Subject[]>, void>({
      query: () => `/subject`,
    }),
    getAllSubjectForTheUser: b.query<TResponse<Subject[]>, void>({
      query: () => `/subject/by-user`,
    }),
    // ----------------------- Tasks -----------------------
    getAllTasksForTheUser: b.query<
      TResponse<Task[]>,
      { page?: number; limit?: number }
    >({
      query: ({ limit, page }) =>
        `/task/by-user${page ? `?page=${page}` : ""}${
          limit ? `&limit=${limit}` : ""
        }`,
    }),
    getAllTasks: b.query<TResponse<Task[]>, { subjectId?: number }>({
      query: ({ subjectId }) =>
        `/task${subjectId ? `?subjectId=${subjectId}` : ""}`,
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useGetAllEventsQuery,
  useGetAllDocsQuery,
  useGetAllDocsForTheUserQuery,
  useGetAllQuizzesForTheUserQuery,
  useGetAllSubjectForTheUserQuery,
  useGetAllSubjectsQuery,
  useGetAllTasksForTheUserQuery,
  useGetAllTasksQuery,
} = api;
