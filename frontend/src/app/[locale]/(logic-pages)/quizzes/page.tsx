import UpdateSubjectId from "@/app/_components/Buttons/UpdateSubjectId";
import QuizzesSection from "@/app/_components/section/quizzes/QuizzesSection";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async () => {
  const t = await getTranslations("QuizzesSection");

  return (
    <div>
      <UpdateSubjectId />
      <QuizzesSection
        title={t("title")}
        noQuizzes={t("noQuizzes")}
        loadingText={t("loading")}
      />
    </div>
  );
};

export default page;
