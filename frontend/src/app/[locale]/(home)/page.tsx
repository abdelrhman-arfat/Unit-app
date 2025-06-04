import HeroMainSection from "@/app/_components/section/main/HeroMainSection";
import ServicesMainSection from "@/app/_components/section/main/ServicesMainSection";
import { services } from "@/app/types/Services";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

  const services: services = [
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
  return (
    <div>
      <HeroMainSection
        title={t("title")}
        description={t("description")}
        learnMore={t("learnMore")}
        getStarted={t("getStarted")}
      />
      <ServicesMainSection header={t("services.title")} services={services} />
    </div>
  );
}
