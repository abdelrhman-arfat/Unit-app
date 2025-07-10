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
import { useTranslations } from "next-intl";
import { useFilterSelector } from "@/app/hooks/Selectors";

const UpdateSubjectId = () => {
  const t2 = useTranslations("filters");
  const selectSubject = t2("selectSubject");
  const selectSubjectPlaceholder = t2("selectSubjectPlaceholder");
  const loading = t2("loading");
  const allSubjects = t2("allSubjects");
  const { data, isLoading } = useGetAllSubjectForTheUserQuery();
  const dispatch = useAppDispatcher();
  const filter = useFilterSelector();
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
          {selectSubject}
        </label>
        <Select
          value={
            filter.subjectId && filter.subjectId !== null
              ? String(filter.subjectId)
              : "all"
          }
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-full md:max-w-[300px]">
            <SelectValue placeholder={selectSubjectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{allSubjects}</SelectItem>
            {isLoading ? (
              <SelectItem value="loading" disabled>
                {loading}
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
