"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import AppLoader from "../loaders/AppLoader";
import NoData from "../common/NoData";
import TableHeaderData from "../ui/TableHeaderData";
import DeleteBTN from "../Buttons/DeleteBTN";
import { useTranslations } from "next-intl";
import { deleteUserById } from "@/app/utils/api/DeleteUserById";
import UserFilters from "../filters/UserFilters";
import { UserSearchFilter } from "@/app/types/UserSearchFilter";
import UpdateUser from "../Buttons/UpdateUser";

const UsersTable = () => {
  const [filters, setFilters] = useState<UserSearchFilter>({});
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery(filters, {
    pollingInterval: 5 * 60 * 1000, // 5 minutes
  });

  const t = useTranslations("AdminPage");
  const users = data?.data?.data;

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="rounded-xl bg-card shadow-md overflow-hidden">
        <UserFilters setFilters={setFilters} />
        <TableHeaderData length={users?.length ?? 0} name={t("AllUsers")} />
        {isLoading ? (
          <AppLoader />
        ) : isError ? (
          <NoData message="Failed to load users" />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.role}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.grade}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.specialization}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <UpdateUser user={user} refetch={refetch} />
                      <DeleteBTN
                        func={() => deleteUserById(user.id as number, refetch)}
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

export default UsersTable;
