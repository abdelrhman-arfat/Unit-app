"use client";
import React from "react";
import { useGetAllSubjectForTheUserQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { setFilter } from "@/app/_RTK/redux-slices/FilteringSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  translations: {
    selectSubject: string;
    selectSubjectPlaceholder: string;
    loading: string;
    allSubjects: string;
  };
};

const UpdateSubjectId = ({ translations }: Props) => {
  const { data, isLoading } = useGetAllSubjectForTheUserQuery();
  const dispatch = useAppDispatcher();
  const subjects = data?.data?.data ?? [];

  const handleSelectChange = (value: string) => {
    if (value === "all") {
      dispatch(setFilter({ subjectId: null }));
    } else {
      dispatch(setFilter({ subjectId: Number(value) }));
    }
  };

  return (
    <div className="w-full sm:max-w-[200px] px-4 md:px-0 my-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 max-w-2xl mx-auto">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {translations.selectSubject}
        </label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full md:max-w-[300px]">
            <SelectValue placeholder={translations.selectSubjectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.allSubjects}</SelectItem>
            {isLoading ? (
              <SelectItem value="loading" disabled>
                {translations.loading}
              </SelectItem>
            ) : (
              subjects.map((subject) => (
                <SelectItem key={subject.id} value={String(subject.id)}>
                  {subject.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UpdateSubjectId;
