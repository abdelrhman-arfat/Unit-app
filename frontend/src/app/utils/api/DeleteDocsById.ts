import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteDocsById = async (id: number, refetch: () => void) => {
  if (!id) return toast.error("Document not found");
  await toast.promise(axiosInstance.delete(`/docs/delete-docs/${id}`), {
    loading: "Deleting document...",
    success: (res) => {
      refetch();
      return res?.data?.message || "Deleted successfully";
    },
    error: (err) => err?.response?.data?.message || "Failed to delete",
  });
};
