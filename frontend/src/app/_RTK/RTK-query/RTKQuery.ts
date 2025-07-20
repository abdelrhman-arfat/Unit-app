import { API_ULR } from "@/app/constants/ENV";
import { Docs } from "@/app/types/Docs";
import { Event } from "@/app/types/Event";
import { Quiz } from "@/app/types/Quiz";
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
    // ----------------------- Events -----------------------
    getAllEvents: b.query<
      TResponse<Event[]>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => `/event?limit=${limit}&page=${page}`,
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
    getAllTasksForTheUser: b.query<TResponse<Task[]>, { subjectId?: number }>({
      query: ({ subjectId }) =>
        `/task/by-user${subjectId ? `?subjectId=${subjectId}` : ""}`,
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllEventsQuery,
  useGetAllDocsQuery,
  useGetAllDocsForTheUserQuery,
  useGetAllQuizzesForTheUserQuery,
  useGetAllSubjectForTheUserQuery,
  useGetAllSubjectsQuery,
  useGetAllTasksForTheUserQuery,
} = api;
