"use client";

import Link from "next/link";
import { useCookieManager } from "@/hooks/useCookieManager";
import { COOKIE_KEY_COUNTRY_ISO, COOKIE_KEY_LANGUAGE_ISO } from "@/constants";

export default function LocalizedLink({ href, children, ...props }: any) {
  const { cookieValues } = useCookieManager([
    COOKIE_KEY_COUNTRY_ISO,
    COOKIE_KEY_LANGUAGE_ISO,
  ]);

  const country = cookieValues.countryISO || "in";
  const language = cookieValues.languageISO || "en";
  const locale = `${country}-${language}`;

  // Ensure href always starts with locale
  const fullHref =
    typeof href === "string"
      ? `/${locale}${href.startsWith("/") ? href : `/${href}`}`
      : href;

  return (
    <Link href={fullHref} {...props}>
      {children}
    </Link>
  );
}
