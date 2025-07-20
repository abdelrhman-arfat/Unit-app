import { useTranslations } from "next-intl";

import { Home, BookOpenText, HelpCircle, CheckSquare } from "lucide-react";
export const useAdminSideBar = () => {
  const tr = useTranslations("MainPage");
  return () => [
    { name: tr("main"), href: "/admin", icon: Home },
    { name: tr("docs"), href: "/admin/summaries", icon: BookOpenText },
    { name: tr("quiz"), href: "/admin/quizzes", icon: HelpCircle },
    { name: tr("tasks"), href: "/admin/tasks", icon: CheckSquare },
  ];
};
