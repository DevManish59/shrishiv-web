"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ReviewCard from "./review-card";
import ViewMoreCard from "./view-more-card";

interface Review {
  id: number;
  image: string;
  review: string;
  customerName: string;
  purchaseDate: string;
  fullComment?: string;
  countryName: string;
}

interface ReviewListingProps {
  reviews: Review[];
  viewMoreTitle?: string;
  viewMoreSubtitle?: string;
  viewMoreButtonText?: string;
  viewMoreHref?: string;
}

export default function ReviewListing({
  reviews,
  viewMoreTitle = "3460+ Verified Reviews",
  viewMoreSubtitle = "Averaging 4.98 Stars",
  viewMoreButtonText = "VIEW MORE",
  viewMoreHref = "/reviews",
}: ReviewListingProps) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi && !isLargeScreen) emblaApi.scrollPrev();
  }, [emblaApi, isLargeScreen]);

  const scrollNext = useCallback(() => {
    if (emblaApi && !isLargeScreen) emblaApi.scrollNext();
  }, [emblaApi, isLargeScreen]);

  const onSelect = useCallback(() => {
    if (!emblaApi || isLargeScreen) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, isLargeScreen]);

  useEffect(() => {
    if (!emblaApi || isLargeScreen) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect, isLargeScreen]);

  return (
    <div className="relative">
      <div
        className={`overflow-hidden ${
          isLargeScreen ? "pointer-events-none touch-none" : ""
        }`}
        ref={emblaRef}
      >
        <div className={`flex gap-2 px-1 justify-between`}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`${
                isLargeScreen
                  ? "w-full sm:w-1/2 md:w-1/3 lg:w-1/6"
                  : "flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_calc(16.666%-15px)]"
              }`}
            >
              <ReviewCard review={review} />
            </div>
          ))}

          {/* View More Card */}
          <div
            className={`${
              isLargeScreen
                ? "w-full sm:w-1/2 md:w-1/3 lg:w-1/6"
                : "flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_calc(16.666%-15px)]"
            }`}
          >
            <ViewMoreCard
              title={viewMoreTitle}
              subtitle={viewMoreSubtitle}
              buttonText={viewMoreButtonText}
              href={viewMoreHref}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {!isLargeScreen && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className={`lg:hidden cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center ${
              !prevBtnEnabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className={`lg:hidden cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center ${
              !nextBtnEnabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
