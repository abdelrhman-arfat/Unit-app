"use client";
import { useState } from "react";
import type React from "react";

import { useUserSelector } from "@/app/hooks/Selectors";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { gradesEnum } from "@/app/types/grades";
import { specializationsEnum } from "@/app/types/Specialization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Edit,
  X,
  Shield,
  User,
  GraduationCap,
  Building,
  Mail,
  Home,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { setUserData } from "@/app/_RTK/redux-slices/UserSlice";
import { Link } from "@/i18n/navigation";

const UserProfile = () => {
  const { user } = useUserSelector();
  const dispatch = useAppDispatcher();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    specialization: user.specialization || "",
    grade: user.grade || "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).filter(([, val]) => val.trim() !== "")
      );
      await toast
        .promise(axiosInstance.put("/user/update-my-profile", payload), {
          loading: "Updating profile...",
          success: "Profile updated successfully 🎉",
          error: "Failed to update profile ❌",
        })
        .then((res) => {
          dispatch(setUserData(res.data?.data?.data));
        });
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      specialization: user.specialization || "",
      grade: user.grade || "",
    });
    setIsEditing(false);
  };

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Card className="rounded-2xl overflow-hidden shadow-md border border-indigo-100 bg-white">
          <CardHeader className="relative text-center pt-12 pb-8 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 ring-4 ring-white shadow-lg">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-sm" />
              </div>

              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-indigo-800">
                  {user.name || "No Name"}
                </CardTitle>
                <p className="text-indigo-600 font-medium">{user.email}</p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className={`rounded-lg px-6 font-semibold transition ${
                    isEditing
                      ? "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 rounded-lg px-6 font-semibold transition bg-transparent"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link href="/main">
                  <Button
                    variant="outline"
                    className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 rounded-lg px-6 font-semibold transition bg-transparent"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProfileItem
                  icon={<User className="w-5 h-5 text-indigo-600" />}
                  label="Full Name"
                  value={formData.name}
                />
                <ProfileItem
                  icon={<Mail className="w-5 h-5 text-indigo-600" />}
                  label="Email"
                  value={user.email}
                />
                <ProfileItem
                  icon={<GraduationCap className="w-5 h-5 text-indigo-600" />}
                  label="Grade"
                  value={formData.grade}
                />
                <ProfileItem
                  icon={<Building className="w-5 h-5 text-indigo-600" />}
                  label="Specialization"
                  value={formData.specialization}
                />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    value={formData.name}
                    onChange={(val) => handleChange("name", val)}
                    placeholder="Enter your name"
                  />
                  <SelectField
                    label="Grade"
                    value={formData.grade}
                    onChange={(val) => handleChange("grade", val)}
                    options={gradesEnum}
                  />
                  <SelectField
                    label="Specialization"
                    value={formData.specialization}
                    onChange={(val) => handleChange("specialization", val)}
                    options={specializationsEnum}
                  />
                </div>

                <Separator className="bg-indigo-100" />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="rounded-lg px-6 border-indigo-300 text-indigo-600 hover:bg-indigo-50 font-semibold transition bg-transparent"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-lg px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-lg border border-indigo-100 bg-indigo-50/30 hover:bg-indigo-50/50 transition">
    <div className="w-10 h-10 rounded-lg bg-white border border-indigo-200 flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-indigo-700 text-sm font-medium block mb-1">
        {label}
      </span>
      <span className="text-indigo-900 font-semibold text-lg">
        {value || "—"}
      </span>
    </div>
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="text-indigo-800 text-sm font-semibold block mb-2">
      {label}
    </label>
    <input
      className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: Record<string, string>;
}) => (
  <div>
    <label className="text-indigo-800 text-sm font-semibold block mb-2">
      {label}
    </label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full rounded-lg border border-indigo-300 focus:ring-2 focus:ring-indigo-500 bg-white">
        <SelectValue placeholder={`Select your ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent className="rounded-lg border border-indigo-200">
        {Object.entries(options).map(([key, label]) => (
          <SelectItem
            key={key}
            value={key}
            className="focus:bg-indigo-50 focus:text-indigo-900"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default UserProfile;
