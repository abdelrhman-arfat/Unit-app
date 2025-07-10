"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, FileText } from "lucide-react";
import { Quiz } from "@/app/types/Quiz";
import { useTranslations } from "next-intl";
import AnimationCard1 from "../common/AnimationCard1";

type Props = {
  quiz: Quiz;
};

const QuizCard = ({ quiz }: Props) => {
  const t = useTranslations("QuizCard");

  const formattedDate = new Date(quiz.startDate).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimationCard1>
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-indigo-700">
          <FileText className="w-5 h-5 text-indigo-400" />
          {quiz.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-700 space-y-2">
        <p>
          📘 {t("subject")}: {quiz.subject.name}
        </p>
        <p>
          🎓 {t("grade")}: {quiz.subject.grade}
        </p>
        <p>
          🔍 {t("specialization")}: {quiz.subject.specialization}
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            {t("date")}: {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-indigo-400" />
            {t("duration")}: {quiz.duration} {t("minutes")}
          </span>
        </div>
      </CardContent>
    </Card>
  </AnimationCard1>
  );
};

export default QuizCard;
