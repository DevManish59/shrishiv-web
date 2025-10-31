export async function fetchLocationData() {
  try {
    const apiKey = "3085ec9551ec4a50a06f6c8de8c98573";
    if (!apiKey) throw new Error("IP Geolocation API key is not defined");
    const res = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
    );
    if (!res.ok) throw new Error("Failed to fetch location data");
    const data = await res.json();
    return {
      countryCode: data.country_code2 || "",
      country: data.country_name || "",
      city: data.city || "",
      flag: getFlagEmoji(data.country_code2 ?? "IN"),
    };
  } catch {
    return { countryCode: "", country: "", city: "", flag: "" };
  }
}

export const getFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};
