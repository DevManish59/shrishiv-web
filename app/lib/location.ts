import { LocationData } from "@/hooks/useLocation";

export async function fetchLocationData(ip: string): Promise<LocationData> {
  try {
    // const apiKey = "3085ec9551ec4a50a06f6c8de8c98573";
    // if (!apiKey) throw new Error("IP Geolocation API key is not defined");
    // const resOld = await fetch(
    //   `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
    // );
    // if (!resOld.ok) throw new Error("Failed to fetch location data");
    // const data = await resOld.json();

    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!res.ok) throw new Error("Failed to fetch location data");
    const data = await res.json();

    return {
      countryCode: data.country_code.toLowerCase() || "in",
      country: data.country_name || "Unknown",
      city: data.city || "Unknown",
      flag: getFlagEmoji(data.country_code ?? "IN"),
      language: (data.languages || navigator.language)
        .split("-")[0]
        .toLowerCase(),
    };
  } catch {
    return { countryCode: "", country: "", city: "", flag: "", language: "" };
  }
}

export const getFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};
