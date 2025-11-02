"use client";

import Cookies from "js-cookie";
import { useState, useEffect, useCallback } from "react";

interface SharedCookieData {
  message?: string;
  [key: string]: any;
}

const COOKIE_KEY = "shrishiv-web-data";

export const useSharedCookie = () => {
  const [cookieData, setCookieData] = useState<SharedCookieData>({});

  // Load cookie once on mount
  useEffect(() => {
    const existing = Cookies.get(COOKIE_KEY);
    if (existing) {
      try {
        setCookieData(JSON.parse(existing));
      } catch {
        setCookieData({});
      }
    }
  }, []);

  // ✅ Update cookie and local state
  const updateCookie = useCallback((newData: Partial<SharedCookieData>) => {
    const existing = Cookies.get(COOKIE_KEY);
    let current: SharedCookieData = {};

    try {
      current = existing ? JSON.parse(existing) : {};
    } catch {
      current = {};
    }

    const updated = { ...current, ...newData };
    Cookies.set(COOKIE_KEY, JSON.stringify(updated), { expires: 7 });
    setCookieData(updated);
  }, []);

  // ✅ Refetch the cookie from browser storage
  const refetchCookie = useCallback(() => {
    const existing = Cookies.get(COOKIE_KEY);
    if (existing) {
      try {
        setCookieData(JSON.parse(existing));
      } catch {
        setCookieData({});
      }
    } else {
      setCookieData({});
    }
  }, []);

  return { cookieData, updateCookie, refetchCookie };
};

// "use client";

// import Cookies from "js-cookie";
// import { useState, useEffect, useCallback } from "react";

// interface SharedCookieData {
//   message?: string;
//   [key: string]: any;
// }

// const COOKIE_KEY = "shrishiv-web-data";

// export const useSharedCookie = () => {
//   const [cookieData, setCookieData] = useState<SharedCookieData>({});

//   // Load cookie once on mount
//   useEffect(() => {
//     const existing = Cookies.get(COOKIE_KEY);
//     if (existing) {
//       try {
//         setCookieData(JSON.parse(existing));
//       } catch {
//         setCookieData({});
//       }
//     }
//   }, []);

//   // ✅ Memoized function that doesn't depend on cookieData
//   const updateCookie = useCallback((newData: Partial<SharedCookieData>) => {
//     const existing = Cookies.get(COOKIE_KEY);
//     let current: SharedCookieData = {};

//     try {
//       current = existing ? JSON.parse(existing) : {};
//     } catch {
//       current = {};
//     }

//     const updated = { ...current, ...newData };
//     Cookies.set(COOKIE_KEY, JSON.stringify(updated), { expires: 7 });
//     setCookieData(updated);
//   }, []);

//   return { cookieData, updateCookie };
// };
