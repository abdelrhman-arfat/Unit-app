"use client";

import { TPlan } from "@/app/utils/funcs/ExtractPlans";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Rocket, Briefcase, Star } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { returnDirection } from "@/app/utils/funcs/TextDirection";
import { useLangSelector } from "@/app/hooks/Selectors";
import { Heading } from "@/components/ui/Heading";
const iconMap = [Rocket, Briefcase, Star]; // أو غيّر حسب عدد الخطط
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
const PricingMainSection = ({
  plans,
  title,
  start,
}: {
  plans: TPlan[];
  title: string;
  start: string;
}) => {
  const dir = returnDirection(useLangSelector());

  return (
    <section className="py-16">
      <Heading size="xl" className="mb-12 text-center">
        {title}
      </Heading>

      <div
        className={`${dir} grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20`}
      >
        {plans.map((plan, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <motion.div
              key={plan.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="rounded-2xl border h-[380px] border-indigo-200 shadow-sm hover:shadow-md transition-all bg-white">
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-2xl font-bold text-indigo-700">
                        {plan.title}
                      </h3>
                    </div>

                    <p className="text-xl font-semibold mb-4">{plan.price}</p>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <Check className="w-4 h-4 text-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                    variant="default"
                  >
                    {start}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingMainSection;
