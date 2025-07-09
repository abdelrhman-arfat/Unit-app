import { API_ULR } from "@/app/constants/ENV";
import { Event } from "@/app/types/Event";
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
    // ----------------------- USERS -----------------------
    getMy: b.query<TResponse<User>, void>({
      query: () => "/user/get-me",
    }),
    // ----------------------- Events -----------------------
    getAllEvents: b.query<
      TResponse<Event[]>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => `/event?limit=${limit}&page=${page}`,
    }),
  }),
});

export const { useGetMyQuery, useGetAllEventsQuery } = api;
