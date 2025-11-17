"use client";
import { useEffect, useMemo, useState } from "react";
import CountrySelectorModal from "../ui/country-selector-modal";
import LocalizedLink from "./LocalizedLink";
import {
  Loader2,
  Facebook,
  Instagram,
  Pin,
  Twitter,
  Youtube,
  Linkedin,
  Send, // for Telegram (lucide-react "Send")
  Phone, // for Skype (or use a custom icon)
  MessageCircle, // for Snapchat
  Music, // for TikTok
} from "lucide-react";
import { DynamicPageItem, StoreSocial } from "@/lib/types";
import { Country, Language, SelectedCountry } from "@/types/common";
import {
  COOKIE_KEY_COUNTRY_ISO,
  COOKIE_KEY_LANGUAGE_ISO,
} from "@/lib/cookie-constant";
import { useCookieManager } from "@/hooks/useCookie";
import Link from "next/link";

export default function Footer() {
  const [showCountrySelector, setShowCountrySelector] =
    useState<boolean>(false);

  const [selectedCountryData, setSelectedCountryData] =
    useState<SelectedCountry>({
      countryCode: "in",
      languageCode: "en",
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageListdata, setPageListdata] = useState([]);
  const [storeSocialLinks, setStoreSocialLinks] = useState<StoreSocial>();
  const { cookieValues, refetchCookie } = useCookieManager([
    COOKIE_KEY_COUNTRY_ISO,
    COOKIE_KEY_LANGUAGE_ISO,
  ]);
  const [countriesLoading, setCountriesLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  const selectedCountryName = useMemo(() => {
    const code = selectedCountryData.countryCode;
    return (
      countries.find((c) => c.iso2.toLowerCase() === code.toLowerCase())
        ?.name || "INDIA"
    );
  }, [selectedCountryData.countryCode, countries]);

  const fetchCountryAndLanguage = async () => {
    try {
      setCountriesLoading(true);
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
      setCountriesLoading(false);
    } catch (error) {
      console.error("Error fetching country and language:", error);
      setCountriesLoading(false);
    }
  };

  const fetchPagesData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/page`);
      const pagesData = await response.json();
      setPageListdata(pagesData?.pageListData);
      setStoreSocialLinks(pagesData?.storeSocialData);
    } catch (error) {
      console.error("Error fetching header data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPagesData();
    fetchCountryAndLanguage();
  }, []);

  useEffect(() => {
    setSelectedCountryData((prev) => ({
      countryCode: cookieValues.countryISO || prev.countryCode,
      languageCode: cookieValues.languageISO || prev.languageCode,
    }));
  }, [cookieValues.countryISO, cookieValues.languageISO]);

  const socialLinks = [
    {
      label: "Facebook",
      href: storeSocialLinks?.socialFacebook || "#",
      icon: Facebook,
      isHidden: !storeSocialLinks?.socialFacebook,
    },
    {
      label: "Instagram",
      href: storeSocialLinks?.socialInstagram || "#",
      icon: Instagram,
      isHidden: !storeSocialLinks?.socialInstagram,
    },
    {
      label: "Pinterest",
      href: storeSocialLinks?.socialPinterest || "#",
      icon: Pin,
      isHidden: !storeSocialLinks?.socialPinterest,
    },
    {
      label: "Twitter",
      href: storeSocialLinks?.socialTwitter || "#",
      icon: Twitter,
      isHidden: !storeSocialLinks?.socialTwitter,
    },
    {
      label: "YouTube",
      href: storeSocialLinks?.socialYoutube || "#",
      icon: Youtube,
      isHidden: !storeSocialLinks?.socialYoutube,
    },
    // {
    //   label: "Tumblr",
    //   href: storeSocialLinks?.socialTumblr || "#",
    //   icon: Tumblr,
    //   isHidden: !storeSocialLinks?.socialTumblr,
    // },
    {
      label: "LinkedIn",
      href: storeSocialLinks?.socialLinkedin || "#",
      icon: Linkedin,
      isHidden: !storeSocialLinks?.socialLinkedin,
    },
    {
      label: "Telegram",
      href: storeSocialLinks?.socialTelegram || "#",
      icon: Send,
      isHidden: !storeSocialLinks?.socialTelegram,
    },
    {
      label: "Skype",
      href: storeSocialLinks?.socialSkype || "#",
      icon: Phone,
      isHidden: !storeSocialLinks?.socialSkype,
    },
    {
      label: "Snapchat",
      href: storeSocialLinks?.socialSnapchat || "#",
      icon: MessageCircle,
      isHidden: !storeSocialLinks?.socialSnapchat,
    },
    {
      label: "TikTok",
      href: storeSocialLinks?.socialTiktok || "#",
      icon: Music,
      isHidden: !storeSocialLinks?.socialTiktok,
    },
  ];

  return (
    <footer className="bg-white">
      {/* Main Footer Links */}
      <div className="py-8 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowCountrySelector(true)}
              className="text-sm hover:opacity-70 flex items-center gap-2 cursor-pointer uppercase"
            >
              {selectedCountryName || "INDIA"}
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
            </button>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center sm:gap-x-6 gap-x-4 sm:gap-y-4 gap-y-4 mb-8">
            {socialLinks
              .filter((link) => !link.isHidden)
              .map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-600 hover:text-black transition-colors"
                    aria-label={link.label}
                    target="_blank"
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                );
              })}
          </div>

          {isLoading ? (
            <div className="flex items-center space-x-2 justify-center p-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-base text-gray-500">Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-8 gap-1 md:gap-y-4">
              {pageListdata.length > 0 &&
                pageListdata.map((pageItem: DynamicPageItem, idx) => (
                  <LocalizedLink
                    key={idx}
                    href={`/p/${pageItem?.pageUrl}`}
                    className="hover:opacity-70 sm:text-sm text-[13px] uppercase"
                  >
                    {pageItem?.name}
                  </LocalizedLink>
                ))}
            </div>
          )}
        </div>
      </div>

      <CountrySelectorModal
        isOpen={showCountrySelector}
        onClose={() => {
          refetchCookie();
          setShowCountrySelector(false);
        }}
        countryData={countries}
        languageData={languages}
        isDataFetching={countriesLoading}
      />
    </footer>
  );
}
