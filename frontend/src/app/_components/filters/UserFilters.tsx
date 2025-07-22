"use client";

import { gradesEnum } from "@/app/types/grades";
import { rolesEnum } from "@/app/types/roles";
import { specializationsEnum } from "@/app/types/Specialization";
import { UserSearchFilter } from "@/app/types/UserSearchFilter";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserFilters = ({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<UserSearchFilter>>;
}) => {
  const handleChange = (name: keyof UserSearchFilter, value: string) => {
    setFilters((prev: UserSearchFilter) => ({
      ...prev,
      [name]: value === "all" ? undefined : value,
    }));
  };

  return (
    <div className="flex flex-wrap gap-4 items-center m-2">
      {/* Role Filter */}
      <Select onValueChange={(value) => handleChange("role", value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {Object.values(rolesEnum).map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Grade Filter */}
      <Select onValueChange={(value) => handleChange("grade", value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Grades" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Grades</SelectItem>
          {Object.values(gradesEnum).map((grade) => (
            <SelectItem key={grade} value={grade}>
              {grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Specialization Filter */}
      <Select onValueChange={(value) => handleChange("specialization", value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Specializations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Specializations</SelectItem>
          {Object.values(specializationsEnum).map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserFilters;
