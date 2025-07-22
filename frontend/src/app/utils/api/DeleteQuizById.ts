import { toast } from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteQuizById = async (id: number, refetch: () => void) => {
  try {
    await axiosInstance.delete(`/quiz/delete-quiz/${id}`);
    toast.success("Quiz deleted successfully!");
    refetch();
  } catch {
    toast.error("Failed to delete quiz.");
  }
};
