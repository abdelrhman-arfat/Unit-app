"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { toast } from "react-hot-toast";
import Update from "./Update";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/app/types/Tasks";

type Props = {
  task: Task;
  refetch: () => void;
};

const UpdateTask = ({ task, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState(
    task.endDate ? new Date(task.endDate).toISOString().split("T")[0] : ""
  );

  const { id, title, description, startDate } = task;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      endDate: formData.get("endDate"),
    };

    await toast
      .promise(axiosInstance.put(`/task/update-task/${id}`, payload), {
        loading: "Updating task...",
        success: "Task updated successfully ✅",
        error: "Failed to update task ❌",
      })
      .then(() => {
        refetch();
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Update setOpen={setOpen} />
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={description}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              disabled
              defaultValue={new Date(startDate).toISOString().split("T")[0]}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Task
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
