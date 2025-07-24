import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteSubjectById = async (id: number, refetch: () => void) => {
  try {
    await axiosInstance.delete(`/subject/delete-subject/${id}`);
    toast.success("subject deleted successfully!");
    refetch();
  } catch {
    toast.error("Failed to delete subject.");
  }
};
