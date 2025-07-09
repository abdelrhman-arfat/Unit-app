import { axiosInstance } from "./axiosInstance";

export const Logout = async () => {
  try {
    const response = await axiosInstance.get("/auth/logout");
    return response;
  } catch {
    return null;
  }
};
