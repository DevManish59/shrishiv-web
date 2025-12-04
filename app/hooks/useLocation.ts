"use client";
import {
  COOKIE_KEY_COUNTRY_ISO,
  COOKIE_KEY_LANGUAGE_ISO,
  LOCAL_STORAGE_LOCATION_KEY,
} from "@/lib/cookie-constant";
// hooks/useLocation.ts
import { fetchLocationData, getFlagEmoji } from "@/lib/location";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface LocationData {
  countryCode: string;
  city: string;
  country: string;
  flag: string;
  language: string;
}

export function useLocation() {
  const pathname = usePathname();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const pathSegment = pathname.split("/")[1];

  // Check if the pathname matches the format '/countryCode-languageCode/'
  const regex = /^([a-zA-Z]{2})-([a-zA-Z]{2})$/;

  // Match the pathname against the regex
  const match = pathSegment.match(regex);

  useEffect(() => {
    const fetchWithIP = async () => {
      try {
        // We are getting this in client side
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();

        // Get geolocation info from IP
        const geoData = await fetchLocationData(ip);
        const cached = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_LOCATION_KEY) || "{}"
        );
        const cachedCountryISO = Cookies.get(COOKIE_KEY_COUNTRY_ISO);
        const cachedLanguageISO = Cookies.get(COOKIE_KEY_LANGUAGE_ISO);

        if (cached.ip === ip && cached.data) {
          setLocation(cached.data);
          setLoading(false);
          return;
        }

        setLocation(geoData);
        localStorage.setItem(
          LOCAL_STORAGE_LOCATION_KEY,
          JSON.stringify({ ip, geoData })
        );
        const sameCountryCode = cachedCountryISO === match?.[1];
        const sameLanguageCode = cachedLanguageISO === match?.[2];

        if (match) {
          const countryCode = match[1];
          const languageCode = match[2];
          if (!sameCountryCode) {
            Cookies.set(
              COOKIE_KEY_COUNTRY_ISO,
              countryCode || geoData?.countryCode
            );
          }
          if (!sameLanguageCode) {
            Cookies.set(
              COOKIE_KEY_LANGUAGE_ISO,
              languageCode || geoData?.language
            );
          }
        }
      } catch (error) {
        console.error("Location fetch error:", error);
        const fallback: LocationData = {
          countryCode: "in",
          city: "Unknown",
          country: "India",
          flag: getFlagEmoji("IN"),
          language: "en",
        };
        setLocation(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchWithIP();
  }, []);

  return { location, loading };
}
