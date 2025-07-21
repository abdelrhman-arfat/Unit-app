"use client";

import { useState } from "react";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { toast } from "react-hot-toast";
import { Docs } from "@/app/types/Docs";
import Update from "./Update";

type Props = {
  docs: Docs;
  refetch: () => void;
};

const UpdateDocs = ({ docs, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const { id, title, description, link } = docs;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await toast.promise(axiosInstance.put(`/docs/${id}`, formData), {
        loading: "Updating document...",
        success: (res) => {
          refetch();
          setOpen(false);
          return res?.data?.message || "Document updated";
        },
        error: (err) =>
          err?.response?.data?.message || "Failed to update document",
      });
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <>
      <Update setOpen={setOpen} />
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="title" className="block font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={title}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block font-semibold mb-1"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  defaultValue={description}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="link" className="block font-semibold mb-1">
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  defaultValue={link}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Update Document
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateDocs;
