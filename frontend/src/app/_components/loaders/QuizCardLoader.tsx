"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const QuizCardLoader = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-3/4 bg-gray-300" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full bg-gray-200" />
        <Skeleton className="h-3 w-5/6 bg-gray-200" />
        <Skeleton className="h-3 w-2/3 bg-gray-200" />
      </CardContent>
    </Card>
  );
};

export default QuizCardLoader;
