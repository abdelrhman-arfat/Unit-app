import UpdateSubjectId from "@/app/_components/Buttons/UpdateSubjectId";
import DocsSummariesSection from "@/app/_components/section/summaries/DocsSummariesSection";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async () => {
  const t = await getTranslations("SummaryPage");

  return (
    <div>
      <UpdateSubjectId />
      <DocsSummariesSection
        showPDF={t("showPDF")}
        emptyPDF={t("emptyPDF")}
        title={t("title")}
      />
    </div>
  );
};

export default page;
