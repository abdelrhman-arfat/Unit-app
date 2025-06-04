"use client";

import React from "react";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, BookOpen, ClipboardList, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/app/types/Services";

const iconMap = {
  FileText,
  ClipboardList,
  BookOpen,
  CalendarCheck,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const ServicesMainSection = ({
  services,
  header,
}: {
  services: services;
  header: string;
}) => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <Heading size="xl" className="mb-12 text-center">
        {header}
      </Heading>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon];

          return (
            <motion.div key={service.title} variants={cardVariants}>
              <Card className="shadow-lg">
                <CardContent className="p-8 min-h-[260px]  flex flex-col items-center text-center space-y-4">
                  <div className="bg-gradient-to-tr from-indigo-400 via-indigo-500 to-indigo-600 text-white rounded-full p-5 shadow-lg flex items-center justify-center w-20 h-20">
                    <Icon size={48} />
                  </div>
                  <Heading size="lg">{service.title}</Heading>
                  <Paragraph className="text-muted-foreground">
                    {service.description}
                  </Paragraph>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ServicesMainSection;
