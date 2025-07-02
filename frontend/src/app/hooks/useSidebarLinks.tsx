import { useTranslations } from "next-intl"; 
import { useCallback } from "react";
import { Home, BookOpenText, HelpCircle, CheckSquare } from "lucide-react";

export function useSidebarLinks() {
  const tr = useTranslations("MainPage");
  const navItems = useCallback(() => {
    return [
      { name: tr("main"), href: "/main", icon: Home },
      { name: tr("docs"), href: "/summaries", icon: BookOpenText },
      { name: tr("quiz"), href: "/quiz", icon: HelpCircle },
      { name: tr("tasks"), href: "/tasks", icon: CheckSquare },
    ];
  }, [tr]);

  return navItems();
}
