import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";

const DeleteEvent = ({ id, refetch }: { id: number; refetch: () => void }) => {
  const handleDeleteEvent = (id: number) => {
    toast
      .promise(axiosInstance.delete(`/event/delete-event/${id}`), {
        loading: "Deleting event...",
        success: "Event deleted successfully 🎉",
        error: "Failed to delete event ❌",
      })
      .then(() => refetch());
  };
  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={() => handleDeleteEvent(id)}
    >
      Delete
    </Button>
  );
};

export default DeleteEvent;
