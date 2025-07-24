"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PencilLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGetAllSubjectsQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { Subject } from "@/app/types/Subject";

export default function CreateTaskForm({ refetch }: { refetch: () => void }) {
  const t = useTranslations("AdminPage");
  const { data, isLoading } = useGetAllSubjectsQuery();
  const subjects: Subject[] = data?.data?.data || [];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      subjectId: Number(formData.get("subjectId")),
    };

    if (
      !payload.title ||
      !payload.description ||
      !payload.startDate ||
      !payload.endDate ||
      !payload.subjectId
    ) {
      return toast.error("Please fill in all fields");
    }

    try {
      setIsSubmitting(true);
      await toast.promise(axiosInstance.post("/task", payload), {
        loading: "Creating task...",
        success: "Task created successfully ✅",
        error: "Failed to create task ❌",
      });
      form.reset();
      refetch();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md p-6 rounded-2xl">
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex items-center gap-3 mb-4">
          <PencilLine className="text-blue-600" />
          <div>
            <CardTitle className="text-lg">{t("AddNewTask")}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {t("FillData")}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                type="text"
                required
                placeholder="Enter task title"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                required
                placeholder="Task description"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  name="startDate"
                  type="date"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  name="endDate"
                  type="date"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select
                name="subjectId"
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a subject</option>
                {isLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  subjects.map((subject: Subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </CardContent>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? t("Submitting") : t("SubmitBTN")}
          </button>
        </div>
      </form>
    </Card>
  );
}
