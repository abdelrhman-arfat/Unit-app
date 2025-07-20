"use client";

import { Button } from "@/components/ui/button";
import { EyeClosed } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  component?: React.ReactNode;
}

const OpenCard = ({
  icon,
  title,
  description,
  buttonText,
  component,
}: SettingCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const compo = useMemo(() => component, [component]);

  const onClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-primary">{icon}</div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Button
            className="text-sm bg-indigo-500  hover:bg-indigo-600 text-white hover:text-white duration-300"
            variant="outline"
            color="indigo"
            size="sm"
            onClick={onClick}
          >
            {isOpen ? <EyeClosed className="w-4 h-4" /> : buttonText}
          </Button>
        </div>
      </div>

      {isOpen && compo && (
        <div className="animate-fade-in border border-border rounded-xl p-4 bg-muted">
          {compo}
        </div>
      )}
    </div>
  );
};

export default OpenCard;
