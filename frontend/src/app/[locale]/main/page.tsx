import EventsMainSection from "@/app/_components/section/main/EventsMainSection";
import { getTranslations } from "next-intl/server";

const MainPage = async () => {
  const t = await getTranslations("MainPage");
  return (
    <>
      <EventsMainSection
        title={t("events")}
        noEventsText={t("noEventsText")}
        allEventsLoadedText={t("allEventsLoadedText")}
        visitEventText={t("visitEventText")}
      />
    </>
  );
};

export default MainPage;
