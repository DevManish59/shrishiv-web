"use client";
import { Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Country, Language, SelectedCountry } from "../../types/common";
import { useSharedCookie } from "@/hooks/useSharedCookie";

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CountrySelectorModal({
  isOpen,
  onClose,
}: CountrySelectorModalProps) {
  const { cookieData, updateCookie } = useSharedCookie();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<SelectedCountry>({
    name: "India",
    languages: { code: "en", name: "English" },
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  const fetchCountryAndLanguage = async () => {
    try {
      setIsLoading(true);
      const endpoints = {
        country: `${process.env.EXTERNAL_API_URL}/countries`,
        language: `${process.env.EXTERNAL_API_URL}/web/common/languages`,
      };

      // Fetch both in parallel
      const [countryRes, languageRes] = await Promise.all([
        fetch(endpoints.country, { cache: "no-store" }),
        fetch(endpoints.language, { cache: "no-store" }),
      ]);

      // Check for failed responses
      if (!countryRes.ok || !languageRes.ok) {
        throw new Error(
          `External API failed: country=${countryRes.status} language=${languageRes.status}`
        );
      }

      const [countryData, languageData] = await Promise.all([
        countryRes.json(),
        languageRes.json(),
      ]);

      const publishedCountry = countryData.filter(
        (country: Country) => country.published
      );
      const sortedLanguages = languageData.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );

      setCountries(publishedCountry);
      setLanguages(sortedLanguages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching country and language:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCountryAndLanguage();
      if (cookieData?.selectedCountryAndLang) {
        // If cookie exists, use it to set the state
        setSelectedData(cookieData.selectedCountryAndLang);
      } else {
        // If cookie doesn't exist, set the initial value in cookie
        updateCookie({
          selectedCountryAndLang: {
            name: "India",
            languages: { code: "en", name: "English" },
          },
        });
      }
    }
  }, [isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageCode = e.target.value;

    // Find the selected language from the languages array
    const selectedLang = languages.find(
      (lang) => lang.data.code === languageCode
    );

    if (selectedLang) {
      setSelectedData({
        ...selectedData,
        languages: {
          code: selectedLang.data.code,
          name: selectedLang.name,
        },
      });
    }
  };

  const handleAccept = () => {
    updateCookie({ selectedCountryAndLang: selectedData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg">WHICH COUNTRY WOULD LIKE TO SHOP IN?</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center space-x-2 justify-center px-6 py-10 my-10">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-base text-gray-500">Loading...</span>
            </div>
          ) : (
            <div className="space-y-6 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  Select a country or region
                </label>
                <div className="relative">
                  <select
                    value={selectedData.name}
                    onChange={(e) =>
                      setSelectedData({ ...selectedData, name: e.target.value })
                    }
                    className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                  >
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Select a language</label>
                <div className="relative">
                  <select
                    value={selectedData.languages.code}
                    onChange={handleLanguageChange}
                    className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                  >
                    {languages.map((language) => (
                      <option
                        key={language.data.code}
                        value={language.data.code}
                      >
                        {language.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleAccept}
            className="w-full bg-black text-white py-3 hover:opacity-90 cursor-pointer"
          >
            Accept
          </button>

          <p className="mt-4 text-sm text-gray-600">
            By continuing, you accept the{" "}
            <button className="underline cursor-pointer">
              Terms & Conditions
            </button>{" "}
            of your chosen country or region.
          </p>
        </div>
      </div>
    </div>
  );
}
