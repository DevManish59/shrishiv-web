"use client";

import { useRouter } from "next/navigation";

interface ViewMoreCardProps {
  className?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
}

export default function ViewMoreCard({
  className = "",
  title = "3460+ Verified Reviews",
  subtitle = "Averaging 4.98 Stars",
  buttonText = "VIEW MORE",
  href = "/reviews",
}: ViewMoreCardProps) {
  const router = useRouter();

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col justify-center items-center ${className}`}
    >
      <div className="text-center p-6">
        <p className="text-2xl font-medium mb-2">{title}</p>
        <p className="text-xl mb-6">{subtitle}</p>
        <button
          className="bg-black text-white px-8 py-3 rounded-none cursor-pointer pointer-events-auto hover:bg-gray-800 transition-colors relative z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("clicked");
            router.push(href);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
