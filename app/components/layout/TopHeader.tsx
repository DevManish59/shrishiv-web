import React from "react";
import { useSharedCookie } from "@/hooks/useSharedCookie";

export default function TopHeader() {
  const { cookieData } = useSharedCookie();
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="container mx-auto px-2">
        <div className="flex md:h-10 h-8 items-center justify-center md:text-base text-sm">
          {cookieData.message ? (
            <p dangerouslySetInnerHTML={{ __html: cookieData.message }} />
          ) : (
            <>
              <span className="mr-1 font-semibold">
                Unlock Your Free Gifts!
              </span>
              <span>Claim At Checkout!</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
