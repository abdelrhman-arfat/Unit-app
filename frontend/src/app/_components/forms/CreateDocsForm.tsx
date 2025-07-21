"use client";

import { toast } from "react-hot-toast";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllSubjectsQuery } from "@/app/_RTK/RTK-query/RTKQuery";

export default function CreateDocsForm({ refetch }: { refetch: () => void }) {
  const { data, isLoading } = useGetAllSubjectsQuery();
  const subjects = data?.data?.data || [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    console.log({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      subjectId: formData.get("subjectId") as string,
      link: formData.get("link") as string,
    });
    if (
      !formData.get("title") ||
      !formData.get("description") ||
      !formData.get("subjectId") ||
      !formData.get("link")
    ) {
      return toast.error("Please fill in all fields");
    }
    await toast
      .promise(
        axiosInstance.post("/docs", {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          subjectId: Number(formData.get("subjectId")),
          link: formData.get("link") as string,
        }),
        {
          loading: "Creating document...",
          success: "Document created 🎉",
          error: "Failed to create document ❌",
        }
      )
      .then((res) => {
        console.log(res);
        refetch();
        form.reset();
      });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <form onSubmit={handleSubmit}>
        <CardHeader className="mb-6 p-0">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Create Document
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-1">
            Provide a title, description, subject name, and document link.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                type="text"
                min={4}
                max={50}
                required
                placeholder="Enter document title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                required
                minLength={10}
                rows={4}
                placeholder="Add a brief description"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Link
              </label>
              <input
                name="link"
                type="url"
                required
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                name="subjectId"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="">Select a subject</option>
                {isLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  subjects.map((subject) => (
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
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-white hover:bg-indigo-700 duration-300"
          >
            Create Document
          </Button>
        </div>
      </form>
    </Card>
  );
}
