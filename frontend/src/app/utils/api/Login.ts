import { axiosInstance } from "./axiosInstance";
export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response;
  } catch {
    return null;
  }
};
