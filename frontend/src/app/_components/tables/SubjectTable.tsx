"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OpenCard from "../cards/OpenCard";
import CreateSubjectForm from "../forms/CreateSubjectForm";
import { useGetAllSubjectsQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { HelpCircle } from "lucide-react";
import { Subject } from "@/app/types/Subject";
import TableHeaderData from "../ui/TableHeaderData";
import AppLoader from "../loaders/AppLoader";
import NoData from "../common/NoData";
import UpdateSubject from "../Buttons/UpdateSubject";
import DeleteBTN from "../Buttons/DeleteBTN";
import { useTranslations } from "next-intl";
import { deleteSubjectById } from "@/app/utils/api/DeleteSubjectById";

const SubjectTable = () => {
  const { data, isLoading, isError, refetch } = useGetAllSubjectsQuery(
    undefined,
    {
      pollingInterval: 5 * 60 * 1000,
    }
  );

  const t = useTranslations("AdminPage");
  const subjects = data?.data?.data ?? [];

  return (
    <div className="space-y-6 px-4 py-6">
      <OpenCard
        title={t("AllSubjects")}
        buttonText={t("AddNewSubject")}
        component={<CreateSubjectForm refetch={refetch} />}
        icon={<HelpCircle className="text-green-600" />}
      />

      <div className="rounded-xl bg-card shadow-md overflow-hidden">
        <TableHeaderData length={subjects.length} name={t("AllSubjects")} />

        {isLoading ? (
          <AppLoader />
        ) : isError ? (
          <NoData message="Failed to load subjects" />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {subjects.map((subject: Subject) => (
                  <TableRow key={subject.id} className="hover:bg-muted/40">
                    <TableCell className="text-sm font-medium">
                      {subject.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {subject.grade}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {subject.specialization}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <UpdateSubject subject={subject} refetch={refetch} />
                      <DeleteBTN
                        func={() => deleteSubjectById(subject.id, refetch)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectTable;
