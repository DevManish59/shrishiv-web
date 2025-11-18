"use client";
import { Loader2, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Country, Language, SelectedCountry } from "../../types/common";
import { usePathname, useRouter } from "next/navigation";
import {
  COOKIE_KEY_COUNTRY_ISO,
  COOKIE_KEY_LANGUAGE_ISO,
} from "@/lib/cookie-constant";
import { useCookieManager } from "@/hooks/useCookie";

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryData: Country[];
  languageData: Language[];
  isDataFetching: boolean;
}

export default function CountrySelectorModal({
  isOpen,
  onClose,
  countryData,
  languageData,
  isDataFetching,
}: CountrySelectorModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { cookieValues, setCookieValues } = useCookieManager([
    COOKIE_KEY_COUNTRY_ISO,
    COOKIE_KEY_LANGUAGE_ISO,
  ]);

  const [selectedData, setSelectedData] = useState<SelectedCountry>({
    countryCode: cookieValues.countryISO || "in",
    languageCode: cookieValues.languageISO || "en",
  });

  useEffect(() => {
    if (!isOpen) return;

    setSelectedData({
      countryCode: cookieValues.countryISO || "in",
      languageCode: cookieValues.languageISO || "en",
    });
  }, [isOpen, cookieValues.countryISO, cookieValues.languageISO]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const langCode = e.target.value;
      setSelectedData((prev) => ({
        ...prev,
        languageCode: langCode,
      }));
    },
    []
  );

  const handleAccept = () => {
    setCookieValues({
      [COOKIE_KEY_COUNTRY_ISO]: selectedData.countryCode,
      [COOKIE_KEY_LANGUAGE_ISO]: selectedData.languageCode,
    });
    const cleanPath = pathname.replace(/^\/[a-z]{2}-[a-z]{2}/, "") || "/";
    const locale = `${selectedData.countryCode}-${selectedData.languageCode}`;

    router.push(`/${locale}${cleanPath}`);
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
          {isDataFetching ? (
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
                    value={selectedData.countryCode}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        countryCode: e.target.value,
                      })
                    }
                    className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                  >
                    {countryData.map((country) => (
                      <option
                        key={country.name}
                        value={country.iso2.toLowerCase()}
                      >
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
                    value={selectedData.languageCode}
                    onChange={handleLanguageChange}
                    className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                  >
                    {languageData.map((language) => (
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
