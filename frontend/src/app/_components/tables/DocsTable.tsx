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
import { useGetAllDocsQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import UpdateDocs from "../Buttons/UpdateDocs";
import { BookOpenCheck } from "lucide-react";
import OpenCard from "../cards/OpenCard";
import CreateDocsForm from "../forms/CreateDocsForm";
import { deleteDocsById } from "@/app/utils/api/DeleteDocsById";
import DeleteBTN from "../Buttons/DeleteBTN";
import Open from "../Buttons/Open";
import AppLoader from "../loaders/AppLoader";
import NoData from "../common/NoData";
import TableHeaderData from "../ui/TableHeaderData";
import { useTranslations } from "next-intl";

const DocsTable = () => {
  const { data, isLoading, isError, refetch } = useGetAllDocsQuery(undefined, {
    pollingInterval: 5 * 60 * 1000, // 5 minutes
  });

  const t = useTranslations("AdminPage");

  const docs = data?.data.data;

  return (
    <div className="space-y-6 px-4 py-6">
      <OpenCard
        title={t("AllDocs")}
        buttonText={t("AddNewDocs")}
        component={<CreateDocsForm refetch={refetch} />}
        icon={<BookOpenCheck className="text-green-600" />}
      />

      <div className="rounded-xl bg-card shadow-md overflow-hidden">
        <TableHeaderData length={docs?.length ?? 0} name={t("AllDocs")} />
        {isLoading ? (
          <AppLoader />
        ) : isError ? (
          <NoData message="Failed to load events" />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs?.map((docs) => (
                  <TableRow key={docs.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium text-sm">
                      {docs.title}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                      {docs.description}
                    </TableCell>
                    <TableCell>
                      <Open link={docs.link} />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <UpdateDocs docs={docs} refetch={refetch} />
                      <DeleteBTN
                        func={() => deleteDocsById(docs.id, refetch)}
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

export default DocsTable;
