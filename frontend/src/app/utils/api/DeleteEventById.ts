import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";

export const deleteEventById = async (id: number, refetch: () => void) => {
  if (!id) return toast.error("Event not found");
  await toast
    .promise(axiosInstance.delete(`/event/delete-event/${id}`), {
      loading: "Deleting event...",
      success: "Event deleted successfully 🎉",
      error: "Failed to delete event ❌",
    })
    .then(() => refetch());
};
