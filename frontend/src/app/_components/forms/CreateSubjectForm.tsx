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
import { gradesEnum } from "@/app/types/grades";
import { specializationsEnum } from "@/app/types/Specialization";

export default function CreateSubjectForm({
  refetch,
}: {
  refetch: () => void;
}) {
  const t = useTranslations("AdminPage");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      grade: formData.get("grade") as string,
      specialization: formData.get("specialization") as string,
    };

    if (!payload.name || !payload.grade || !payload.specialization) {
      return toast.error("Please fill in all fields");
    }

    try {
      setIsSubmitting(true);
      await toast.promise(axiosInstance.post("/subject", payload), {
        loading: "Creating subject...",
        success: "Subject created successfully 🎉",
        error: "Failed to create subject ❌",
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
          <PencilLine className="text-indigo-500" />
          <div>
            <CardTitle className="text-lg">{t("AddNewSubject")}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {t("FillData")}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter subject name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Grade</label>
              <select
                name="grade"
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a grade</option>
                {Object.values(gradesEnum).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Specialization
              </label>
              <select
                name="specialization"
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a specialization</option>
                {Object.values(specializationsEnum).map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? t("Submitting") : t("SubmitBTN")}
          </button>
        </div>
      </form>
    </Card>
  );
}
