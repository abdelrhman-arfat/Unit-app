import { axiosInstance } from "./axiosInstance";

export const signup = async (email: string, password: string, name: string) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      email,
      password,
      name,
    });
    return response;
  } catch {
    return null;
  }
};
