"use client";

import { useState } from "react";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { toast } from "react-hot-toast";
import { User } from "@/app/types/User";
import Update from "./Update";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { roles, rolesEnum } from "@/app/types/roles";

type Props = {
  user: User;
  refetch: () => void;
};

const UpdateUser = ({ user, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const { id, role } = user;
  const [selectedRole, setSelectedRole] = useState<roles | undefined>(role);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedRole) return toast.error("Please select a role");

    try {
      await toast.promise(
        axiosInstance.put(`/user/update-role`, {
          id,
          role: selectedRole,
        }),
        {
          loading: "Updating user role...",
          success: (res) => {
            refetch();
            setOpen(false);
            return res?.data?.message || "User role updated successfully";
          },
          error: (err) =>
            err?.response?.data?.message || "Failed to update role",
        }
      );
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
              {/* Role only */}
              <div>
                <label className="block font-semibold mb-1">Role</label>
                <Select
                  defaultValue={role}
                  onValueChange={(value: roles) => setSelectedRole(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(rolesEnum).map((roleValue) => (
                      <SelectItem key={roleValue} value={roleValue}>
                        {roleValue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Update Role
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
