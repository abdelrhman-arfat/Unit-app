import { University } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <main className="bg-background text-foreground px-6 py-20 max-w-5xl mx-auto">
      {/* Introduction Section */}
      <section className="mb-20 border-b border-gray-200 pb-14">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 text-center leading-tight">
          {t("title")}
        </h1>
        <p className="text-center text-lg max-w-3xl mx-auto text-muted-foreground mb-4">
          {t("intro1")}
        </p>
        <p className="text-center text-lg max-w-3xl mx-auto text-muted-foreground">
          {t("intro2")}
        </p>
      </section>

      {/* Future Vision Section */}
      <section className="mb-20 border-b border-gray-200 pb-14">
        <h2 className="text-4xl font-semibold text-indigo-700 mb-8 text-center flex justify-center items-center gap-3">
          <University className="text-indigo-600 text-3xl" />
          {t("futureTitle")}
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-muted-foreground leading-relaxed">
          {t("futureDesc")}
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 px-16 py-5 text-lg font-semibold transition-colors duration-300 shadow-lg shadow-indigo-300/30"
          size="lg"
        >
          {t("cta")}
        </Button>
      </section>
    </main>
  );
}
