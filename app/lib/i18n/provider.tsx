"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { i18nDictionary } from "./dictionaries";

type I18nContextType = {
  t: (key: string) => string;
  locale: string;
};

const I18nContext = createContext<I18nContextType>({
  t: (k) => k,
  locale: "en-in",
});

export function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const dict = i18nDictionary[locale] ?? i18nDictionary["en-in"];
  const t = (key: string) => (dict as any)[key] ?? key;

  return (
    <I18nContext.Provider value={{ t, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => useContext(I18nContext);
