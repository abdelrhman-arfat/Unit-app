import { useSelector } from "react-redux";
import { RootState } from "../_RTK/store";

export const useLangSelector = () => {
  const lang = useSelector((state: RootState) => state.languages);
  return lang;
};
