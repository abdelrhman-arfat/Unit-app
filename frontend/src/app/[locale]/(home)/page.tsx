import ContactUsMainSection from "@/app/_components/section/home/ContactUsMainSection";
import HeroMainSection from "@/app/_components/section/home/HeroMainSection";
import PricingMainSection from "@/app/_components/section/home/PricingMainSection";
import ServicesMainSection from "@/app/_components/section/home/ServicesMainSection";
import { services } from "@/app/types/Services";
import { ExtractPlans, TPlan } from "@/app/utils/funcs/ExtractPlans";
import { ExtractService } from "@/app/utils/funcs/ExtractService";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");
  const services: services = ExtractService(t);
  const plans: TPlan[] = ExtractPlans(t);
  return (
    <div>
      <HeroMainSection
        title={t("title")}
        description={t("description")}
        learnMore={t("learnMore")}
        getStarted={t("getStarted")}
      />
      <ServicesMainSection title={t("services.title")} services={services} />
      <PricingMainSection
        plans={plans}
        title={t("plans.plansTitle")}
        start={t("plans.buyNow")}
      />
      <ContactUsMainSection />
    </div>
  );
}
