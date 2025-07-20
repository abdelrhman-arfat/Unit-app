"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

export default function CreateEventForm({ refetch }: { refetch: () => void }) {
  const setFile = useState<File | null>(null)[1];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selected);
      setPreviewUrl(objectUrl);
    } else if (selected && selected.type === "application/pdf") {
      setPreviewUrl(null);
      toast.error("PDF will be uploaded but cannot be previewed.");
    } else {
      setPreviewUrl(null);
      toast.error("Unsupported file type.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    await toast
      .promise(
        axiosInstance.post("/event", data, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Creating event...",
          success: "Event created successfully 🎉",
          error: "Failed to create event ❌",
        }
      )
      .then(() => {
        refetch();
      });

    form.reset();
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="w-full mx-auto p-4 shadow-md border border-gray-200 bg-white">
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex flex-row items-center gap-3 mb-4">
          <UploadCloud className="text-indigo-500" />
          <div>
            <CardTitle className="text-lg">Create New Event</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Fill in the details below
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Link</label>
              <input
                name="link"
                type="url"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-600"
              >
                <UploadCloud className="w-4 h-4" />
                Choose Image
              </label>

              {previewUrl && (
                <span className="text-sm text-gray-500 truncate max-w-[200px]">
                  {previewUrl.split("/").pop()}
                </span>
              )}
            </div>

            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl && (
              <div className="relative w-full h-60 rounded-xl overflow-hidden border border-gray-300 shadow-md">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
          </div>
        </CardContent>

        <div className="p-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Create Event
          </button>
        </div>
      </form>
    </Card>
  );
}
