import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimationCard1 from "@/app/_components/common/AnimationCard1";

const TaskCard = ({
  title,
  description,
  subjectName,
  startDate,
  endDate,
  createdAt,
  creatorName,
}: {
  title: string;
  description: string;
  subjectName: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  creatorName: string;
}) => {
  return (
    <AnimationCard1>
      <Card className="transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="flex flex-row items-start gap-3">
          <FileText className="text-indigo-500 mt-1" />
          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString()} by {creatorName}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow text-sm text-gray-700 space-y-2">
          <p className="line-clamp-2">{description}</p>
          <p className="text-xs">
            📚 <b>Subject:</b> {subjectName}
          </p>
          <p className="text-xs">
            🕒 <b>Duration:</b> {new Date(startDate).toLocaleDateString()} →{" "}
            {new Date(endDate).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </AnimationCard1>
  );
};

export { TaskCard };
