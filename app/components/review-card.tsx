"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Review {
  id: number;
  imageUrls: string[];
  review: string;
  rating: number;
  name: string;
  isApproved: boolean;
  purchaseDate: string;
  countryName: string;
  fullComment?: string;
  image?: string;
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
        {!imageError && review.imageUrls && review.imageUrls.length > 0 && (
          <Image
            src={review.imageUrls?.[0]}
            alt={`Review by ${review.name}`}
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
        <div>
          <div className="w-full flex items-start justify-start gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div>
            <p className="text-gray-700 text-left mb-4">{review.review}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{review.name}</span>
          {review.isApproved && (
            <span className="text-white bg-blue-500 text-xs px-2 py-0.5 rounded">
              Verified
            </span>
          )}
        </div>
      </div>
      {/* <div className="p-6 text-center flex-1 flex flex-col justify-between">
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
      </div> */}
    </div>
  );
}
