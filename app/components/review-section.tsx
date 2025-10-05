"use client";

import { useEffect, useState } from "react";
import ReviewListing from "./review-listing";
import ReviewSkeleton from "./product/review-skeleton";

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

const reviewsStatic: Review[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg?auto=compress&cs=tinysrgb&w=800",
    review:
      "Ankit and team were super accommodating to any changes to the design. I added a hidden halo and increased the width to 2.0mm. The ring took about a month to arrive from the initial order...",
    fullComment:
      "Ankit and team were super accommodating to any changes to the design. I added a hidden halo and increased the width to 2.0mm. The ring took about a month to arrive from the initial order, but it was worth the wait. The quality is exceptional!",
    name: "Erika",
    rating: 4,
    purchaseDate: "22/10/2023",
    countryName: "United States",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1721936/pexels-photo-1721936.jpeg?auto=compress&cs=tinysrgb&w=800",
    review:
      "I ordered a customized version of a stock ring that had a fixed center stone size. I upgraded to a larger center stone, which required Ankit to change the rest of the ring to accommodate...",
    fullComment:
      "I ordered a customized version of a stock ring that had a fixed center stone size. I upgraded to a larger center stone, which required Ankit to change the rest of the ring to accommodate the new size. The result is stunning and exactly what I wanted!",
    name: "Alexa Carol",
    rating: 5,
    purchaseDate: "22/12/2023",
    countryName: "United States",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1721938/pexels-photo-1721938.jpeg?auto=compress&cs=tinysrgb&w=800",
    review:
      "The ring is absolutely stunning! And it came quicker than expected. It originally was not going to come in time for the engagement, but it arrive way earlier than expected.",
    name: "Avery Preston",
    rating: 3,
    purchaseDate: "27/12/2023",
    countryName: "United States",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1721939/pexels-photo-1721939.jpeg?auto=compress&cs=tinysrgb&w=800",
    review:
      "These studs are so beautifully made. The quality, colour, and size of the diamonds are exactly what I wanted. I received them as a graduation gift and could not be happier. The posts are...",
    fullComment:
      "These studs are so beautifully made. The quality, colour, and size of the diamonds are exactly what I wanted. I received them as a graduation gift and could not be happier. The posts are secure and comfortable to wear all day.",
    name: "Victoria",
    rating: 5,
    purchaseDate: "31/12/2023",
    countryName: "United States",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/1721940/pexels-photo-1721940.jpeg?auto=compress&cs=tinysrgb&w=800",
    review:
      "Absolutely love my new necklace! The craftsmanship is outstanding and the customer service was exceptional. The delivery was prompt and the packaging was beautiful...",
    fullComment:
      "Absolutely love my new necklace! The craftsmanship is outstanding and the customer service was exceptional. The delivery was prompt and the packaging was beautiful. I've received so many compliments already. Highly recommend!",
    name: "Sarah Mitchell",
    rating: 4,
    purchaseDate: "15/01/2024",
    countryName: "United States",
  },
];

export default function ReviewSection() {
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
          <h2 className="text-3xl font-medium mb-4">Customer Reviews</h2>
          <p className="text-gray-600">
            3460+ Verified Reviews with an Average Rating of 4.98 Stars
          </p>
        </div>
        {isLoading ? (
          <ReviewSkeleton />
        ) : (
          <ReviewListing reviews={reviewsList || reviewsStatic} />
        )}
      </div>
    </div>
  );
}
