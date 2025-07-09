import UpdateSubjectId from "@/app/_components/Buttons/UpdateSubjectId";
import DocsSummariesSection from "@/app/_components/section/summaries/DocsSummariesSection";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async () => {
  const t = await getTranslations("SummaryPage");
  const t2 = await getTranslations("filters");

  return (
    <div>
      <UpdateSubjectId
        translations={{
          selectSubject: t2("selectSubject"),
          selectSubjectPlaceholder: t2("selectSubjectPlaceholder"),
          loading: t2("loading"),
          allSubjects: t2("allSubjects"),
        }}
      />
      <DocsSummariesSection
        showPDF={t("showPDF")}
        title={t("title")}
        description={t("description")}
      />
    </div>
  );
};

export default page;
