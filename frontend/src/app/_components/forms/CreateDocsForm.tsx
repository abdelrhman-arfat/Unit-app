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
import { Button } from "@/components/ui/button";

export default function CreateDocsForm({ refetch }: { refetch: () => void }) {
  const setFile = useState<File | null>(null)[1];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    await toast
      .promise(
        axiosInstance.post("/docs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Creating document...",
          success: "Document created 🎉",
          error: "Failed to create document ❌",
        }
      )
      .then(() => {
        refetch();
        form.reset();
        setFile(null);
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
            Provide a title, description, subject ID, and a document link.
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
                Subject ID
              </label>
              <input
                name="subjectId"
                type="number"
                min={1}
                required
                placeholder="e.g., 123"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
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
