import { services } from "@/app/types/Services";

export const ExtractService = (t: (key: string) => string): services => {
  return [
    {
      title: t("services.pdfTitle"),
      description: t("services.pdfDescription"),
      icon: "FileText",
    },
    {
      title: t("services.quizTitle"),
      description: t("services.quizDescription"),
      icon: "ClipboardList",
    },
    {
      title: t("services.exercisesTitle"),
      description: t("services.exercisesDescription"),
      icon: "BookOpen",
    },
    {
      title: t("services.examsTitle"),
      description: t("services.examsDescription"),
      icon: "CalendarCheck",
    },
  ];
};
