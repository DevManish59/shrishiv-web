"use client";

import { useEffect, useState } from "react";
import ReviewListing from "./review-listing";
import ReviewSkeleton from "./product/review-skeleton";
import constantJson from "../../json/constant.json";
import { useLocale } from "@/contexts/LocalProvider";
import { LanguageValue } from "@/types/common";

const sectionTitles = constantJson.customer_reviews as LanguageValue;

interface Review {
  id: number;
  image: string;
  review: string;
  name: string;
  rating: number;
  purchaseDate: string;
  fullComment?: string;
  countryName: string;
}

export default function ReviewSection() {
  const { language } = useLocale();
  const sectionTitle = sectionTitles[language] ?? sectionTitles["en"];
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviewsList(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div className={`h-full bg-white sm:py-16 py-10`}>
      <div className="h-full flex flex-col justify-evenly mx-auto px-4 xl:px-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4">{sectionTitle}</h2>
          <p className="text-gray-600">
            3460+ Verified Reviews with an Average Rating of 4.98 Stars
          </p>
        </div>
        {isLoading ? (
          <ReviewSkeleton />
        ) : (
          <ReviewListing reviews={reviewsList} />
        )}
      </div>
    </div>
  );
}
