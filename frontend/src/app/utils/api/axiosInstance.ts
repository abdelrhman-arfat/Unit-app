import { API_ULR } from "@/app/constants/ENV";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: API_ULR,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
