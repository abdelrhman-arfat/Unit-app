"use client";

import React, { useCallback } from "react";
import { useUserSelector } from "@/app/hooks/Selectors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UserCard = () => {
  const { user } = useUserSelector();
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    console.log("Logging out...");
  }, []);
  const goToProfile = useCallback(async () => {
    router.push("/profile");
  }, [router]);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-fit justify-start p-2 hover:bg-gray-100 rounded-lg"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm truncate">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side="top" className="w-40">
        <DropdownMenuItem onClick={goToProfile}>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(UserCard);
