// hooks/useLocation.ts
import { fetchLocationData, getFlagEmoji } from "@/lib/location";
import { useEffect, useState } from "react";

export interface LocationData {
  countryCode: string;
  city: string;
  country: string;
  flag: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithIP = async () => {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();

        const cached = JSON.parse(
          localStorage.getItem("user-location") || "{}"
        );

        if (cached.ip === ip && cached.data) {
          setLocation(cached.data);
          setLoading(false);
          return;
        }

        const data = await fetchLocationData();
        const freshLocation: LocationData = {
          countryCode: data.countryCode ?? "IN",
          city: data.city ?? "Unknown",
          country: data.country ?? "Unknown",
          flag: getFlagEmoji(data.countryCode ?? "IN"),
        };

        setLocation(freshLocation);
        localStorage.setItem(
          "user-location",
          JSON.stringify({ ip, data: freshLocation })
        );
      } catch (error) {
        console.error("Location fetch error:", error);
        const fallback: LocationData = {
          countryCode: "IN",
          city: "Unknown",
          country: "India",
          flag: getFlagEmoji("IN"),
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
