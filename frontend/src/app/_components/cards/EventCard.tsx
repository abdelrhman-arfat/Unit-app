"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Event } from "@/app/types/Event";
import { motion } from "framer-motion";

type EventCardProps = {
  event: Event;
  visitEventText: string;
};

const EventCard = ({ event, visitEventText }: EventCardProps) => {
  const { title, description, link, image, startDate, endDate } = event;
  const hasImage = image && image.trim() !== "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="rounded-2xl max-w-[800px] border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 p-0">
        {hasImage && (
          <div className="relative w-full aspect-[3/1.2] overflow-hidden rounded-t-2xl">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        <CardHeader className="pt-4 px-5 pb-1">
          <CardTitle className="text-[22px] font-bold text-neutral-900 tracking-tight leading-tight">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-[15px] text-neutral-700 px-5 pb-5">
          <p className="leading-relaxed">{description}</p>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 bg-green-50 text-green-800 px-3 py-1 rounded-full">
              <CalendarDays className="w-4 h-4" />
              <span className="font-medium">
                {new Date(startDate).toLocaleDateString()} –{" "}
                {new Date(endDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="pt-2">
            {link && link.startsWith("https://") && (
              <div className="pt-2">
                <Button
                  variant="link"
                  className="text-indigo-600 hover:text-indigo-700 p-0 h-auto text-sm font-medium inline-flex items-center gap-1"
                  asChild
                >
                  <Link href={link} target="_blank">
                    {visitEventText}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
