import React from "react";

export default function TopHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="container mx-auto px-2">
        <div className="flex h-10 items-center justify-center">
          <span className="mr-1 font-semibold">Unlock Your Free Gifts!</span>
          <span>Claim At Checkout!</span>
        </div>
      </div>
    </header>
  );
}
