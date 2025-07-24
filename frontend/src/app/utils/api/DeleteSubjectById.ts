import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteSubjectById = async (id: number, refetch: () => void) => {
  await toast
    .promise(axiosInstance.delete(`/subject/delete-subject/${id}`), {
      loading: "Deleting subject...",
      success: "Subject deleted successfully 🎉",
      error: "Failed to delete subject ❌",
    })
    .then(() => refetch());
};
