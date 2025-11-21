import { useRouter } from "next/router";
// resources
import en from "../resources/en";
import ja from "../resources/ja";

export const useLocale = () => {
  const { locale } = useRouter();
  // require just checking whether english or japanese.
  const t = ja;
  return { locale, t };
};
