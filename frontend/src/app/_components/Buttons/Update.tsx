import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";

type TProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Update = ({ setOpen }: TProps) => {
  return (
    <Button
      size="sm"
      title="Edit"
      variant="ghost"
      onClick={() => setOpen(true)}
      className="text-indigo-500 hover:bg-indigo-700 hover:text-white"
    >
      <Pencil className="w-5 h-5" />
    </Button>
  );
};

export default Update;
