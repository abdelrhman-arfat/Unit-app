import { Card, CardContent } from "@/components/ui/card";
import { FileX } from "lucide-react";
import React from "react";

const NoData = ({ message }: { message: string }) => {
  return (
    <Card className="mt-8 border-dashed border-2 border-gray-200 bg-muted text-center py-12">
      <CardContent className="flex flex-col items-center justify-center gap-3">
        <FileX size={48} className="text-gray-400" />
        <p className="text-gray-500">{message}</p>
      </CardContent>
    </Card>
  );
};

export default NoData;
