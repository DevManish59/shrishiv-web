"use client";

import { useState, useCallback } from "react";
import Cookies from "js-cookie";

export function useCookieManager<T extends Record<string, any>>(
  keys: (keyof T)[]
) {
  // Read all cookies that were registered
  const readAll = () => {
    const result: Partial<T> = {};
    keys.forEach((key) => {
      const value = Cookies.get(String(key));
      result[key] = value ?? null;
    });
    return result;
  };

  const [values, setValues] = useState<Partial<T>>(readAll());

  // Create OR update keys
  const set = useCallback(
    (data: Partial<T>, options?: Cookies.CookieAttributes) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          Cookies.set(key, String(value), options);
        }
      });
      setValues(readAll()); // Refetch after update
    },
    [keys]
  );

  // Remove one or many keys
  const remove = useCallback(
    (removeKeys: (keyof T)[]) => {
      removeKeys.forEach((key) => Cookies.remove(String(key)));
      setValues(readAll());
    },
    [keys]
  );

  // Refetch all cookie values manually
  const refetch = useCallback(() => {
    setValues(readAll());
  }, []);

  return {
    cookieValues: values,
    setCookieValues: set,
    removeCookie: remove,
    refetchCookie: refetch,
  };
}
