"use client";

import { createContext, useContext, useEffect } from "react";

interface LocaleContextProps {
  locale: string;
  country: string;
  language: string;
}

const LocaleContext = createContext<LocaleContextProps | null>(null);

export const useLocale = () => useContext(LocaleContext);

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const [country, language] = locale.split("-");

  useEffect(() => {
    if (language) {
      document.body.lang = language;
      document.documentElement.lang = language;
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, country, language }}>
      {children}
    </LocaleContext.Provider>
  );
}
