"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { Subject } from "@/app/types/Subject";
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
import Update from "./Update"; // Your trigger button/icon
import { gradesEnum } from "@/app/types/grades";
import { specializationsEnum } from "@/app/types/Specialization";

type Props = {
  subject: Subject;
  refetch: () => void;
};

const UpdateSubject = ({ subject, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>(
    subject.specialization
  );
  const [selectedGrade, setSelectedGrade] = useState<string>(subject.grade);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      grade: selectedGrade,
      specialization: selectedSpecialization,
    };

    await toast
      .promise(
        axiosInstance.put(`/subject/update-subject/${subject.id}`, payload),
        {
          loading: "Updating subject...",
          success: "Subject updated successfully ✅",
          error: "Failed to update subject ❌",
        }
      )
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
          <DialogTitle>Update Subject</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={subject.name}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Grade</label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(gradesEnum).map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Specialization
            </label>
            <Select
              value={selectedSpecialization}
              onValueChange={setSelectedSpecialization}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(specializationsEnum).map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Subject
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubject;
