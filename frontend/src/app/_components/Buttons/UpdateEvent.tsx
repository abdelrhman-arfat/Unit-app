"use client";

import { Event } from "@/app/types/Event";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Update from "./Update";

type Props = {
  event: Event;
  refetch: () => void;
};

const UpdateEvent = ({ event, refetch }: Props) => {
  const [open, setOpen] = useState(false);

  const defaultValues = {
    title: event.title || "",
    description: event.description || "",
    link: event.link || "",
    startDate: event.startDate?.slice(0, 10) || "",
    endDate: event.endDate?.slice(0, 10) || "",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!event || !event.id) return toast.error("Event not found");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      title: formData.get("title") || defaultValues.title,
      description: formData.get("description") || defaultValues.description,
      link: formData.get("link") || defaultValues.link,
      startDate: formData.get("startDate") || defaultValues.startDate,
      endDate: formData.get("endDate") || defaultValues.endDate,
    };

    await toast.promise(
      axiosInstance.put(`/event/update-event/${event.id}`, data),
      {
        loading: "Updating event...",
        success: (res) => {
          setOpen(false);
          refetch();
          return res.data.message || "Event updated successfully!";
        },
        error: (err) => err?.response?.data?.message || "Update failed",
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Update setOpen={setOpen} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={defaultValues.title}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={defaultValues.description}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium">
              Link
            </label>
            <input
              type="url"
              name="link"
              id="link"
              defaultValue={defaultValues.link}
              placeholder="https://example.com"
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              defaultValue={defaultValues.startDate}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              defaultValue={defaultValues.endDate}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div className="pt-4 text-right">
            <Button type="submit" className="bg-indigo-600">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEvent;
