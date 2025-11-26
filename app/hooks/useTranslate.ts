import { LanguageValue } from "@/types/common";
import constantJson from "../../json/constant.json";
import { useLocale } from "@/contexts/LocalProvider";

export type TranslationKey = keyof typeof constantJson;

export function useTranslate() {
  const { language } = useLocale();

  return function t(key: TranslationKey): string {
    const entry: LanguageValue = constantJson[key];

    if (!entry) {
      console.warn(`Missing translation key: ${key}`);
      return key; // fallback to key if not found
    }

    return entry[language] ?? entry["en"];
  };
}
