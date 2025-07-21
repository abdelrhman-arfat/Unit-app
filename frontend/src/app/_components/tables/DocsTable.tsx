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
import Link from "next/link";
import CreateDocsForm from "../forms/CreateDocsForm";
import { deleteDocsById } from "@/app/utils/api/DeleteDocsById";
import DeleteBTN from "../Buttons/DeleteBTN";

const DocsTable = () => {
  const { data, isLoading, isError, refetch } = useGetAllDocsQuery();

  if (isLoading)
    return (
      <div className="text-center py-10 text-muted-foreground text-sm">
        Loading documents...
      </div>
    );

  if (isError || !data?.data)
    return (
      <div className="text-center py-10 text-red-500 text-sm">
        Failed to load documents. Please try again.
      </div>
    );

  const docs = data.data.data;

  return (
    <div className="space-y-6 px-4 py-6">
      <OpenCard
        title="Documents"
        buttonText="Add Document"
        component={<CreateDocsForm refetch={refetch} />}
        description="Upload and manage your study materials."
        icon={<BookOpenCheck className="text-green-600" />}
      />

      <div className="rounded-xl bg-card shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-foreground">
            All Documents
          </h2>
          <p className="text-sm text-muted-foreground">
            Total: {docs.length} documents
          </p>
        </div>
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
              {docs.map((docs) => (
                <TableRow key={docs.id} className="hover:bg-muted/40">
                  <TableCell className="font-medium text-sm">
                    {docs.title}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                    {docs.description}
                  </TableCell>
                  <TableCell>
                    {docs.link ? (
                      <Link
                        href={docs.link}
                        target="_blank"
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white text-green-600 border border-green-200 hover:bg-green-50 hover:text-green-700 dark:bg-zinc-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-zinc-700 transition-all"
                      >
                        Open
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No Link
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <UpdateDocs docs={docs} refetch={refetch} />
                    <DeleteBTN func={() => deleteDocsById(docs.id, refetch)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DocsTable;
