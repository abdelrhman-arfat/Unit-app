"use client";

import { useState } from "react";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { toast } from "react-hot-toast";
import { Quiz } from "@/app/types/Quiz";
import Update from "./Update";
import { useGetAllSubjectsQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  quiz: Quiz;
  refetch: () => void;
};

const UpdateQuiz = ({ quiz, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(
    quiz.subjectId.toString()
  );

  const { id, title, description, duration, startDate } = quiz;
  const { data: subjectData, isLoading: isSubjectsLoading } =
    useGetAllSubjectsQuery();
  const subjects = subjectData?.data?.data || [];

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      duration: Number(formData.get("duration")),
      startDate: formData.get("startDate"),
      subjectId: Number(selectedSubject),
    };

    await toast
      .promise(axiosInstance.put(`/quiz/update-quiz/${id}`, payload), {
        loading: "Updating quiz...",
        success: "Quiz updated successfully ✅",
        error: "Failed to update quiz ❌",
      })
      .then((res) => {
        console.log(res);
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
          <DialogTitle>Update Quiz</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              required
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
              defaultValue={new Date(startDate).toISOString().split("T")[0]}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              defaultValue={duration}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {isSubjectsLoading ? (
                  <SelectItem value="" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Quiz
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuiz;
