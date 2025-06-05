import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-white border-t shadow-inner pt-16 pb-8 px-6 md:px-12 text-indigo-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Branding and Description */}
        <div className="md:col-span-4">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Unit</h2>
          <p className="text-sm text-muted-foreground leading-loose">
            {t("description")}
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-4">
          <h4 className="text-lg font-semibold text-indigo-700 mb-4">
            {t("links")}
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
              >
                {t("main")}
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-indigo-600 transition-colors"
              >
                {t("services")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-indigo-600 transition-colors"
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-600 transition-colors"
              >
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="md:col-span-4">
          <h4 className="text-lg font-semibold text-indigo-700 mb-4">
            {t("social")}
          </h4>
          <div className="flex gap-4">
            {[Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition duration-300 shadow-sm hover:shadow-md"
              >
                <Icon className="text-indigo-600" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <div className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("copyright")} | Unit
      </div>
    </footer>
  );
};

export default Footer;
