"use client";

import { useState, useEffect } from "react";
import Star from "@/components/ui/star";
import { Review } from "@/lib/types";
import { ReviewFilterType } from "./review-filter";
import { motion } from "framer-motion";
import WriteReview from "./write-review";
import { mockReviews, mockReviewSummary } from "@/lib/mock-data";
import ReviewListing from "../review-listing";

interface ReviewSectionProps {
  productId: number;
  productName?: string;
}

export default function ReviewSection({
  productId,
  productName,
}: ReviewSectionProps) {
  console.log("🚀 ReviewSection: productId =", productId);
  const [currentFilter] = useState<ReviewFilterType>("most_recent");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalRating, setTotalRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<{
    [key: number]: number;
  }>({});

  // console.log("productId+++", productId, productName);

  useEffect(() => {
    fetchReviews();
  }, [productId, currentFilter]);

  const fetchReviews = async () => {
    try {
      // TODO: Implement actual API calls
      /* 
      const response = await fetch(`/api/products/${productId}/reviews?filter=${filter}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data.reviews);
      setTotalRating(data.summary.totalRating);
      setRatingDistribution(data.summary.ratingDistribution);
      */

      // Using mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      setReviews(mockReviews);
      setTotalRating(mockReviewSummary.totalRating);
      setRatingDistribution(mockReviewSummary.ratingDistribution);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // TODO: Implement error handling UI
      // setError('Failed to load reviews. Please try again later.');
    }
  };

  const handleSubmitReview = async (review: {
    rating: number;
    title: string;
    comment: string;
    name: string;
    email: string;
    media?: File[];
    youtubeUrl?: string;
  }) => {
    try {
      // Get external API URL from environment (client-side)
      const externalApiUrl = process.env.EXTERNAL_API_URL;

      if (!externalApiUrl) {
        throw new Error("External API URL not configured");
      }

      // Create FormData for direct API request to backend
      const formData = new FormData();

      // Add required fields
      formData.append("productName", productName || productId);
      formData.append("productId", productId.toString());
      formData.append("rating", review.rating.toString());
      formData.append("review", review.comment);
      formData.append("email", review.email);
      formData.append("name", review.name);

      // Add images if any
      if (review.media && review.media.length > 0) {
        review.media.forEach((file) => {
          formData.append("images", file);
        });
      }

      console.log("🚀 Submitting review directly to backend:", {
        productId,
        rating: review.rating,
        name: review.name,
        email: review.email,
        imageCount: review.media?.length || 0,
        apiUrl: externalApiUrl,
      });

      // Submit directly to external backend API
      const response = await fetch(`${externalApiUrl}/product-review`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Backend API error:", response.status, errorText);
        throw new Error("Failed to submit review to backend");
      }

      const result = await response.json();
      console.log("✅ Review submitted successfully:", result);

      // Add the new review to the existing list for immediate UI update
      const newReview: Review = {
        id: String(Date.now()),
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        author: review.name,
        date: new Date().toISOString().split("T")[0],
        isVerified: true,
        helpfulCount: 0,
        media: review.media
          ? review.media.map((file) => URL.createObjectURL(file))
          : undefined,
        youtubeUrl: review.youtubeUrl,
      };

      setReviews([newReview, ...reviews]);

      // Update rating distribution
      const newDist = { ...ratingDistribution };
      newDist[review.rating] = (newDist[review.rating] || 0) + 1;
      setRatingDistribution(newDist);

      // Update total rating
      const totalReviews = reviews.length + 1;
      const newTotalRating =
        (totalRating * reviews.length + review.rating) / totalReviews;
      setTotalRating(newTotalRating);

      setShowWriteReview(false);

      // Show success message (you can implement a toast notification here)
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  // if (showWriteReview) {
  //   return (
  //     <WriteReview
  //       onCancel={() => setShowWriteReview(false)}
  //       onSubmit={handleSubmitReview}
  //     />
  //   );
  // }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Review Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 justify-between items-start shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 py-9"
        >
          <h2 className="m-auto text-2xl font-medium mb-4">Customer Reviews</h2>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`w-6 h-6 ${
                        value <= totalRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">
                  {(totalRating || 0).toFixed(1)} out of 5
                </span>
              </div>
              <p className="text-gray-600">
                Based on {reviews?.length || 0} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 flex-1 px-4"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-28">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          ((ratingDistribution?.[rating] || 0) /
                            (reviews?.length || 1)) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 1, delay: 0.3 + rating * 0.1 }}
                      className="h-full bg-yellow-400 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {ratingDistribution?.[rating] || 0}
                  </p>
                </div>
              ))}
            </motion.div>
            <div className="flex-1 flex justify-center items-center">
              <button
                onClick={() => setShowWriteReview(!showWriteReview)}
                className="px-6 py-2 bg-black text-white rounded hover:bg-black/90"
              >
                {showWriteReview ? "Cancel Review" : "Write a Review"}
              </button>
            </div>
          </div>
        </motion.div>

        {showWriteReview && (
          <WriteReview
            onCancel={() => setShowWriteReview(false)}
            onSubmit={handleSubmitReview}
          />
        )}

        <ReviewListing reviews={mockReviews} />
      </div>
    </div>
  );
}
