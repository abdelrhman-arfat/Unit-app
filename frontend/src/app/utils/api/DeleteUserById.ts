import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteUserById = async (id: number, refetch: () => void) => {
  await toast
    .promise(axiosInstance.delete(`/user/delete-user/${id}`), {
      loading: "Deleting user...",
      success: "User deleted successfully 🎉",
      error: "Failed to delete user ❌",
    })
    .then(() => refetch());
};
