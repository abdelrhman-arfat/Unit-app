import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteTaskById = async (id: number, refetch: () => void) => {
  await toast
    .promise(axiosInstance.delete(`/task/delete-task/${id}`), {
      loading: "Deleting task...",
      success: "Task deleted successfully 🎉",
      error: "Failed to delete task ❌",
    })
    .then(() => refetch());
};
