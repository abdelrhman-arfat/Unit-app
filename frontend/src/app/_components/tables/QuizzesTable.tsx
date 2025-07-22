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
import { useGetAllQuizzesQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import OpenCard from "../cards/OpenCard";
import CreateQuizForm from "../forms/CreateQuizForm";
import { HelpCircle } from "lucide-react";
import { deleteQuizById } from "@/app/utils/api/DeleteQuizById";
import DeleteBTN from "../Buttons/DeleteBTN";
import AppLoader from "../loaders/AppLoader";
import NoData from "../common/NoData";
import TableHeaderData from "../ui/TableHeaderData";
import { useTranslations } from "next-intl";
import { Quiz } from "@/app/types/Quiz";
import UpdateQuiz from "../Buttons/UpdateQuiz";

const QuizzesTable = () => {
  const { data, isLoading, isError, refetch } = useGetAllQuizzesQuery(
    {},
    {
      pollingInterval: 5 * 60 * 1000, // 5 minutes
    }
  );

  const t = useTranslations("AdminPage");
  const quizzes = data?.data.data;

  return (
    <div className="space-y-6 px-4 py-6">
      <OpenCard
        title={t("AllQuizzes")}
        buttonText={t("AddNewQuiz")}
        component={<CreateQuizForm refetch={refetch} />}
        icon={<HelpCircle className="text-green-600" />}
      />

      <div className="rounded-xl bg-card shadow-md overflow-hidden">
        <TableHeaderData length={quizzes?.length ?? 0} name={t("AllQuizzes")} />
        {isLoading ? (
          <AppLoader />
        ) : isError ? (
          <NoData message="Failed to load quizzes" />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {quizzes?.map((quiz: Quiz) => (
                  <TableRow key={quiz.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium text-sm">
                      {quiz.title}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                      {quiz.description}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {quiz.subject?.name}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {quiz.duration} M
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(quiz.startDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {(() => {
                        const start = new Date(quiz.startDate).getTime();
                        const end = start + quiz.duration * 60 * 1000;
                        const now = Date.now();
                        const isEnded = now > end;

                        return (
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              isEnded
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {isEnded ? "Ended" : "Active"}
                          </span>
                        );
                      })()}
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <UpdateQuiz quiz={quiz} refetch={refetch} />
                      <DeleteBTN
                        func={() => deleteQuizById(quiz.id, refetch)}
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

export default QuizzesTable;
