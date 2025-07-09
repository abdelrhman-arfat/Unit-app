import EventsMainSection from "@/app/_components/section/main/EventsMainSection";
import { getTranslations } from "next-intl/server";

const MainPage = async () => {
  const t = await getTranslations("MainPage");
  return (
    <div className="min-h-screen mb-5 bg-gray-50 py-10 ">
      <EventsMainSection
        title={t("events")}
        noEventsText={t("noEventsText")}
        allEventsLoadedText={t("allEventsLoadedText")}
        visitEventText={t("visitEventText")}
      />
    </div>
  );
};

export default MainPage;
