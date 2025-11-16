// export const locales = ["en-us", "zh-cn", "en-in"];

// export function getLocale(country: string, lang: string) {
//   const map: Record<string, string> = {
//     US_en: "en-us",
//     China_zh: "zh-cn",
//     India_en: "en-in",
//   };

//   return map[`${country}_${lang}`] || "en-in";
// }

export const supportedLocales = ["en-us", "zh-cn", "en-in" /* ... */];

export const countryLangToLocale: Record<string, string> = {
  "United States_en": "en-us",
  India_en: "en-in",
  China_zh: "zh-cn",
  // add mappings you need
};

export function getLocaleFromSelection(countryName: string, langCode: string) {
  const key = `${countryName}_${langCode}`;
  return (
    countryLangToLocale[key] ??
    `${langCode}-${countryName.slice(0, 2).toLowerCase()}`
  ); // fallback guess (optional)
}
