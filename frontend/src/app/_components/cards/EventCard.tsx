"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type EventCardProps = {
  event: {
    title: string;
    description: string;
    link: string;
    image?: string;
    startDate: string;
    endDate: string;
  };
  visitEventText: string;
};

const EventCard = ({ event, visitEventText }: EventCardProps) => {
  const { title, description, link, image, startDate, endDate } = event;
  const hasImage = image && image.trim() !== "";

  return (
    <Card className="rounded-2xl max-w-[800px] overflow-hidden shadow-md hover:shadow-lg transition">
      {hasImage && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold text-indigo-700">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm text-gray-600">
        <p>{description}</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(startDate).toLocaleDateString()} -{" "}
            {new Date(endDate).toLocaleDateString()}
          </span>
        </div>

        <div className="pt-2">
          <Button
            variant="link"
            className="text-indigo-600 p-0 h-auto text-sm"
            asChild
          >
            <Link href={link} target="_blank" rel="noopener noreferrer">
              {visitEventText} <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
