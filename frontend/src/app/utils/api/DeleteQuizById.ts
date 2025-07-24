import { toast } from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteQuizById = async (id: number, refetch: () => void) => {
  await toast
    .promise(axiosInstance.delete(`/quiz/delete-quiz/${id}`), {
      loading: "Deleting quiz...",
      success: "Quiz deleted successfully 🎉",
      error: "Failed to delete quiz ❌",
    })
    .then(() => refetch());
};
