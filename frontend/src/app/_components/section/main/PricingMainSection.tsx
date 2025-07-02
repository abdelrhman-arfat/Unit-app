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

const iconMap = [Rocket, Briefcase, Star];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
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
    <section className="py-16 px-4 sm:px-6 lg:px-12 xl:px-24">
      <Heading size="xl" className="mb-12 text-center text-indigo-800">
        {title}
      </Heading>

      <div
        className={`${dir} grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {plans.map((plan, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <motion.div
              key={plan.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="rounded-2xl border border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
                <CardContent className="p-6 flex flex-col justify-between h-full py-0 md:py-0 sm:py-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-2xl font-bold text-indigo-700">
                        {plan.title}
                      </h3>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 mb-6">
                      {plan.price}
                    </p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-base text-gray-700"
                        >
                          <Check className="w-4 h-4 text-blue-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold py-2 rounded-xl">
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
