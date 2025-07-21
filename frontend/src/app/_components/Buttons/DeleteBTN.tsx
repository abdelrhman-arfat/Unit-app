"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  func: () => void | Promise<string | void>;
};

const DeleteBTN = ({ func }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await func();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleClick}
      disabled={loading}
      className="text-red-500 hover:text-white hover:bg-red-600 transition-colors"
    >
      <Trash2 className="w-5 h-5" />
    </Button>
  );
};

export default DeleteBTN;
