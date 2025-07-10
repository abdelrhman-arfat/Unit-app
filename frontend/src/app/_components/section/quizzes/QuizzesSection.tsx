"use client";

import React from "react";
import { useGetAllQuizzesForTheUserQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { useFilterSelector } from "@/app/hooks/Selectors";
import QuizCard from "../../cards/QuizCard";
import QuizCardLoader from "../../loaders/QuizCardLoader";
import ErrorFetchingData from "../../common/ErrorFetchingData";
import NoData from "../../common/NoData";

type Props = {
  title: string;
  noQuizzes: string;
  loadingText: string;
};

const QuizzesSection = ({ title, noQuizzes }: Props) => {
  const filter = useFilterSelector();

  const { data, isFetching, isError } = useGetAllQuizzesForTheUserQuery({
    subjectId: filter.subjectId ?? undefined,
  });

  const quizzes = data?.data?.data ?? [];

  if (isError) return <ErrorFetchingData />;

  return (
    <section className="min-h-screen bg-white py-10 px-4 md:px-8">
      <div className="relative max-w-3xl mx-auto mb-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-indigo-700">
          {title}
        </h2>
        <div className="mt-3 w-24 h-1 bg-indigo-500 mx-auto rounded-full animate-pulse" />
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <QuizCardLoader key={i} />
          ))}
        </div>
      ) : quizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <NoData message={noQuizzes} />
      )}
    </section>
  );
};

export default QuizzesSection;
