import { TLanguages } from "@/app/types/Languages";

export const TextDirection = (lang: TLanguages): boolean => {
  if (lang === "ar") return false; // rtl
  // else cases en fr etc.. will be ltr
  return true;
};
export const returnDirection = (lang: TLanguages): string => {
  const direction = TextDirection(lang);
  return direction ? "ltr" : "rtl";
};
