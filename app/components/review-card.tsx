"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Review {
  id: number;
  image: string;
  comment: string;
  customerName: string;
  purchaseDate: string;
  fullComment?: string;
  countryName: string;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export default function ReviewCard({
  review,
  className = "",
}: ReviewCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col ${className}`}
    >
      <div
        className={`relative aspect-square ${
          imageError || !imageLoaded || !review.image
            ? "bg-gray-200"
            : "bg-gray-100"
        }`}
      >
        {!imageError && review.image && review.image.trim() !== "" && (
          <Image
            src={review.image}
            alt={`Review by ${review.customerName}`}
            fill
            className={`object-cover aspect-square transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="p-6 text-center flex-1 flex flex-col justify-between">
        <div className="w-full flex items-center justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 mb-4">{review.comment}</p>
        <div className="text-sm text-gray-500 mt-auto">
          <p>Verified Purchase on {review.purchaseDate}</p>
          <p className="font-medium mt-1">
            {review.customerName} - {review.countryName}
          </p>
        </div>
      </div>
    </div>
  );
}
