// hooks/useLocation.ts
import { fetchLocationData, getFlagEmoji } from "@/lib/location";
import { useEffect, useState } from "react";

export interface LocationData {
  countryCode: string;
  city: string;
  country: string;
  flag: string;
  language: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithIP = async () => {
      try {
        // We are getting this in client side
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();

        // Get geolocation info from IP
        const geoData = await fetchLocationData(ip);
        const cached = JSON.parse(
          localStorage.getItem("user-location") || "{}"
        );

        if (cached.ip === ip && cached.data) {
          setLocation(cached.data);
          setLoading(false);
          return;
        }

        setLocation(geoData);
        localStorage.setItem("user-location", JSON.stringify({ ip, geoData }));
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
