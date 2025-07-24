import { useTranslations } from "next-intl";

import {
  Home,
  BookOpenText,
  HelpCircle,
  CheckSquare,
  Users2Icon,
  PenTool,
} from "lucide-react";
export const useAdminSideBar = () => {
  const tr = useTranslations("AdminPage");
  return () => [
    { name: tr("main"), href: "/admin", icon: Home },
    { name: tr("docs"), href: "/admin/summaries", icon: BookOpenText },
    { name: tr("quiz"), href: "/admin/quizzes", icon: HelpCircle },
    { name: tr("tasks"), href: "/admin/tasks", icon: CheckSquare },
    { name: tr("users"), href: "/admin/users", icon: Users2Icon },
    { name: tr("subjects"), href: "/admin/subjects", icon: PenTool },
  ];
};
