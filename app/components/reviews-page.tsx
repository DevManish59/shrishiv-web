"use client";

import { useState, useEffect } from "react";
import Star from "@/components/ui/star";
import { Review } from "@/lib/types";
import ReviewFilter, { ReviewFilterType } from "./product/review-filter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import ReviewSkeleton from "./product/review-skeleton";
import WriteReview from "./product/write-review";
import { mockReviews, mockReviewSummary } from "@/lib/mock-data";
import Image from "next/image";

export default function ReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] =
    useState<ReviewFilterType>("most_recent");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalRating, setTotalRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    fetchReviews();
  }, [currentFilter]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API calls
      /* 
      const response = await fetch(`/api/reviews?filter=${currentFilter}`);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort reviews
  const filteredReviews = [...reviews].sort((a, b) => {
    switch (currentFilter) {
      case "most_recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "highest_rating":
        return b.rating - a.rating;
      case "lowest_rating":
        return a.rating - b.rating;
      case "most_helpful":
        return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      case "with_photos":
        return (b.media?.length || 0) - (a.media?.length || 0);
      case "with_videos":
        return (b.youtubeUrl ? 1 : 0) - (a.youtubeUrl ? 1 : 0);
      default:
        return 0;
    }
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  // Masonry breakpoints
  const breakpointColumns = {
    default: 3,
    1400: 3,
    1100: 2,
    700: 1,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
      // TODO: Implement actual API call
      /* 
      // First upload media files if any
      let mediaUrls: string[] = [];
      if (review.media && review.media.length > 0) {
        const formData = new FormData();
        review.media.forEach(file => formData.append('media', file));
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload media');
        }
        
        const uploadData = await uploadResponse.json();
        mediaUrls = uploadData.urls;
      }

      // Submit review with media URLs
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...review,
          media: mediaUrls,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Refresh reviews after successful submission
      await fetchReviews();
      */

      // Using mock data for now
      console.log("Submitting review:", review);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Add the new review to the existing list
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
    } catch (error) {
      console.error("Error submitting review:", error);
      // TODO: Implement error handling UI
      // setError('Failed to submit review. Please try again.');
    }
  };

  if (showWriteReview) {
    return (
      <div className="container mx-auto px-4 py-8">
        <WriteReview
          onCancel={() => setShowWriteReview(false)}
          onSubmit={handleSubmitReview}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Review Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 justify-between items-start shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 py-9 px-6 rounded-lg"
        >
          <h1 className="text-3xl font-bold text-center w-full mb-4">
            Customer Reviews
          </h1>
          <div className="w-full flex flex-col lg:flex-row gap-8">
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
              <p className="text-gray-600 mb-6">
                Based on {reviews?.length || 0} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 flex-1"
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
                  <span className="text-sm text-gray-500 w-8">
                    {ratingDistribution?.[rating] || 0}
                  </span>
                </div>
              ))}
            </motion.div>
            <div className="flex-1 flex justify-center items-center">
              <button
                onClick={() => setShowWriteReview(true)}
                className="px-6 py-3 bg-black text-white rounded hover:bg-black/90 transition-colors"
              >
                Write a Review
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-start"
        >
          <ReviewFilter value={currentFilter} onChange={setCurrentFilter} />
        </motion.div>

        {/* Reviews Masonry Grid */}
        <div>
          {isLoading ? (
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-4 md:-ml-6"
              columnClassName="pl-4 md:pl-6"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="mb-4 md:mb-6">
                  <ReviewSkeleton />
                </div>
              ))}
            </Masonry>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFilter}
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <Masonry
                  breakpointCols={breakpointColumns}
                  className="flex -ml-4 md:-ml-6"
                  columnClassName="pl-4 md:pl-6"
                >
                  {currentReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      variants={itemVariants}
                      className="mb-4 md:mb-6"
                    >
                      <div className="rounded-lg p-6 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="font-medium">{review.author}</span>
                          {review.isVerified && (
                            <span className="text-white bg-blue-500 text-xs px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-4">
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

                        {review.media && review.media.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {review.media.map((url, index) => (
                              <Image
                                key={index}
                                src={url}
                                alt={`Review media ${index + 1}`}
                                className="w-full h-40 object-cover rounded"
                                width={100}
                                height={100}
                              />
                            ))}
                          </div>
                        )}

                        <p className="text-gray-600 mb-3">{review.comment}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Posted on {review.date}</span>
                          <span>{review.helpfulCount} found this helpful</span>
                        </div>

                        {review.storeResponse && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">
                              {review.storeResponse.response}
                            </p>
                            <div className="text-xs text-gray-500">
                              Response from Shrishiv on{" "}
                              {review.storeResponse.date}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center items-center gap-2 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 ${
                currentPage === 1
                  ? " text-gray-400 cursor-not-allowed"
                  : " text-black hover:bg-black hover:text-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "border border-gray-200 hover:border-black"
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 ${
                currentPage === totalPages
                  ? " text-gray-400 cursor-not-allowed"
                  : "text-black hover:bg-black hover:text-white"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
