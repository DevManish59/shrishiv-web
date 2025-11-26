"use client";

import { Country } from "@/types/common";
import { createContext, useContext, useEffect, useState } from "react";

interface LocaleContextProps {
  locale: string;
  country: string;
  language: string;
  currentCountry?: Country;
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: "in-en",
  country: "in",
  language: "en",
});

export const useLocale = () => useContext(LocaleContext);

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const [country, language] = locale.split("-");
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country>();

  const fetchCountries = async () => {
    try {
      const countryRes = await fetch(
        `${process.env.EXTERNAL_API_URL}/web/countries`,
        {
          cache: "no-store",
          headers: {
            ...(language !== "en" && { languageCode: language }),
          },
        }
      );

      if (!countryRes.ok) {
        throw new Error(`External API failed: country=${countryRes.status}`);
      }

      const countryData = await countryRes.json();
      const publishedCountry = countryData.filter(
        (country: Country) => country.published
      );

      setCountriesList(publishedCountry);
    } catch (error) {
      console.error("Error fetching country and language:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Set currentCountry based on URL locale
  useEffect(() => {
    if (countriesList.length > 0 && country) {
      const found = countriesList.find(
        (c) => c.iso2?.toLowerCase() === country.toLowerCase()
      );
      if (found) {
        setCurrentCountry(found);
      }
    }
  }, [countriesList, country]);

  useEffect(() => {
    if (language) {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LocaleContext.Provider
      value={{ locale, country, language, currentCountry }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
