"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { returnDirection } from "@/app/utils/funcs/TextDirection";
import { useLangSelector } from "@/app/hooks/Selectors";
import { Heading } from "@/components/ui/Heading";
import { useTranslations } from "next-intl";

const formVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ContactUsMainSection = () => {
  const dir = returnDirection(useLangSelector());
  const t = useTranslations("HomePage");
  console.log();

  return (
    <section className="py-16 bg-white">
      <Heading size="xl" className="mb-12 text-center text-indigo-800">
        {t("contact.title")}
      </Heading>

      <motion.div
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`${dir}  px-6 md:px-20`}
      >
        {/* Form Section */}
        <div className="flex flex-col gap-5  rounded-2xl p-8 shadow-md">
          <input
            type="text"
            placeholder={t("contact.yourName")}
            className="px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          />
          <input
            type="email"
            placeholder={t("contact.yourEmail")}
            className="px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          />
          <textarea
            placeholder={t("contact.yourMessage")}
            rows={5}
            className="px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm resize-none"
          />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 rounded-lg w-full transition">
            {t("contact.buttonMessage")}
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUsMainSection;
