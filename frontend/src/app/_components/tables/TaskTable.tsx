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
import { useGetAllTasksQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import OpenCard from "../cards/OpenCard";
import { HelpCircle } from "lucide-react";
import AppLoader from "../loaders/AppLoader";
import NoData from "../common/NoData";
import TableHeaderData from "../ui/TableHeaderData";
import { useTranslations } from "next-intl";
import DeleteBTN from "../Buttons/DeleteBTN";
import { deleteTaskById } from "@/app/utils/api/DeleteTaskById";
import UpdateTask from "../Buttons/UpdateTask";
import CreateTaskForm from "../forms/CreateTaskForm";
import { Task } from "@/app/types/Tasks";

const TaskTable = () => {
  const { data, isLoading, isError, refetch } = useGetAllTasksQuery(
    {},
    {
      pollingInterval: 5 * 60 * 1000, // 5 minutes
    }
  );

  const t = useTranslations("AdminPage");
  const tasks = data?.data?.data || [];

  return (
    <div className="space-y-6 px-4 py-6">
      <OpenCard
        title={t("AllTasks")}
        buttonText={t("AddNewTask")}
        component={<CreateTaskForm refetch={refetch} />}
        icon={<HelpCircle className="text-green-600" />}
      />

      <div className="rounded-xl bg-card shadow-md overflow-hidden">
        <TableHeaderData length={tasks.length} name={t("AllTasks")} />
        {isLoading ? (
          <AppLoader />
        ) : isError ? (
          <NoData message="Failed to load tasks" />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tasks.map((task: Task) => {
                  const end = task.endDate
                    ? new Date(task.endDate).getTime()
                    : null;
                  const now = Date.now();
                  const isEnded = end && now > end;

                  return (
                    <TableRow key={task.id} className="hover:bg-muted/40">
                      <TableCell className="font-medium text-sm">
                        {task.title}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                        {task.description || "No description"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(task.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {task.endDate
                          ? new Date(task.endDate).toLocaleDateString()
                          : "Not set"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            isEnded
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isEnded ? "Ended" : "Active"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <UpdateTask task={task} refetch={refetch} />
                        <DeleteBTN
                          func={() => deleteTaskById(task.id, refetch)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTable;
