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
import toast from "react-hot-toast";
import { Logout } from "@/app/utils/api/Logout";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { logout } from "@/app/_RTK/redux-slices/UserSlice";

const UserCard = () => {
  const { user } = useUserSelector();
  const router = useRouter();
  const dispatch = useAppDispatcher();

  const handleLogout = useCallback(async () => {
    toast
      .promise(Logout, {
        loading: "Logging out...",
        success: (res) => res?.data.message || "Logged out successfully",
        error: (err) => err?.response?.data?.message || "Error logging out",
      })
      .then(() => {
        dispatch(logout());
        router.replace("/");
      });
  }, [router, dispatch]);

  const goToProfile = useCallback(() => {
    router.push("/profile");
  }, [router]);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 px-3 py-2 rounded-xl  transition-all duration-200"
        >
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm truncate max-w-[120px] hidden sm:inline-block">
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-44 rounded-xl shadow-lg border"
      >
        <DropdownMenuItem
          onClick={goToProfile}
          className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white rounded-md px-2 py-2"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 cursor-pointer transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-800 hover:text-red-700 dark:hover:text-red-300 rounded-md px-2 py-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(UserCard);
