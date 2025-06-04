"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Paragraph } from "@/components/ui/Paragraph";
import { Heading } from "@/components/ui/Heading";
import { returnDirection } from "@/app/utils/funcs/TextDirection";
import { useLangSelector } from "@/app/hooks/Selectors";

interface IHeroProps {
  title: string;
  description: string;
  getStarted: string;
  learnMore: string;
}

const HeroMainSection = ({
  title,
  description,
  getStarted,
  learnMore,
}: IHeroProps) => {
  const lang = useLangSelector();
  const dir = returnDirection(lang);

  return (
    <section
      className={`min-h-[600px] py-20 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-10 ${
        dir === "rtl" ? "md:flex-row-reverse text-right" : "text-left"
      }`}
    >
      {/* Text Content */}
      <div className="w-full md:w-2/3 space-y-6 animate-fade-up">
        <Heading size="xl" className="leading-tight tracking-tight">
          {title}
        </Heading>
        <Paragraph className="text-muted-foreground text-lg">
          {description}
        </Paragraph>

        <div
          className={`flex gap-4 ${
            dir === "rtl" ? "justify-end" : "justify-start"
          }`}
        >
          <Button variant="outline" size="lg">
            {learnMore}
          </Button>
          <Button
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700 transition duration-300"
            size="lg"
          >
            {getStarted}
          </Button>
        </div>
      </div>

      {/* Illustration */}
      <div className="w-full md:w-1/3 flex justify-center animate-fade-in">
        <Image
          src="/computer-faculty-illustration.png"
          alt="Faculty of Computer Illustration"
          width={480}
          height={480}
          priority
          className="rounded-xl "
        />
      </div>
    </section>
  );
};

export default HeroMainSection;
