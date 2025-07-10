"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import AnimationCard1 from "../common/AnimationCard1";

type Props = {
  title: string;
  description: string;
  link: string;
  showPDF: string;
  createdAt: string;
};

const DocsCard = ({ title, description, link, createdAt, showPDF }: Props) => {
  return (
    <AnimationCard1>
      <Card className="transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center gap-3">
          <FileText className="text-indigo-500" />
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm min-h-[40px]  line-clamp-2 text-gray-700 mb-4">
            {description}
          </p>
          <Link
            href={link}
            target="_blank"
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            {showPDF}
          </Link>
        </CardContent>
      </Card>
    </AnimationCard1>
  );
};

export default DocsCard;
