/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import Star from "@/components/ui/star";
import { Upload, X } from "lucide-react";
import { ReviewType } from "@/lib/types";

interface WriteReviewProps {
  onCancel: () => void;
  onSubmit: (review: ReviewType) => void;
  productId?: number | string;
}

export default function WriteReview({
  productId,
  onCancel,
  onSubmit,
}: WriteReviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [reviewData, setReviewData] = useState<ReviewType | any>({});
  const [media, setMedia] = useState<File[]>([]);
  const [errors, setErrors] = useState<{
    rating?: string;
    review?: string;
    name?: string;
    email?: string;
    file?: string;
  }>({});
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const validateFiles = (files: File[]) => {
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setErrors({ file: `File ${file.name} exceeds 10 MB limit.` });
        return false;
      }
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!reviewData.rating || reviewData.rating < 1) {
      newErrors.rating = "Please select rating";
    }

    if (!reviewData.review?.trim()) {
      newErrors.review = "Please enter your review";
    }

    if (!reviewData.name?.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!reviewData.email?.trim()) {
      newErrors.email = "Please enter your email";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (reviewData.email && !emailPattern.test(reviewData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // If any errors exist → stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // No errors → clear
    setErrors({});

    const reviewFormData = new FormData();
    media.forEach((file) => {
      reviewFormData.append("images", file); // backend should accept "media" as file
    });
    // Append all fields

    if (productId) {
      reviewFormData.append("productId", String(productId));
    }
    reviewFormData.append("productName", reviewData?.productName ?? "");
    reviewFormData.append("rating", String(reviewData?.rating ?? 0)); // ✅ stringify number
    reviewFormData.append("review", reviewData?.review ?? "");
    reviewFormData.append("email", reviewData?.email ?? "");
    reviewFormData.append("name", reviewData?.name ?? "");

    onSubmit(reviewFormData as any);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (!validateFiles(newFiles)) return;
      setMedia((prev) => [...prev, ...newFiles]);
    }
    // if (e.target.files) {
    //   setMedia(Array.from(e.target.files));
    // }
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setReviewData((prevData: ReviewType) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      if (!validateFiles(newFiles)) return;
      setMedia((prev) => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="w-full md:max-w-2xl mx-auto px-4 md:px-0">
      <div className="flex justify-center items-center mb-8">
        <div>
          <h2 className="text-2xl font-medium">Write a review</h2>
          <div className="flex flex-col items-center gap-2 mt-2 justify-center">
            <p className="text-sm text-gray-500">Rating</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value: number) => (
                <button
                  key={value}
                  onClick={() =>
                    setReviewData({ ...reviewData, rating: value })
                  }
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      value <= (reviewData?.rating as number)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm -mt-1">{errors.rating}</p>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">
            Review Title <span className="text-xs text-gray-500">(100)</span>
          </label>
          <input
            id="reviewTitle"
            type="text"
            value={reviewData.reviewTitle}
            onChange={handleChange}
            maxLength={100}
            placeholder="Give your review a title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Review</label>
          <textarea
            id="review"
            value={reviewData.review}
            onChange={handleChange}
            // onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comments here"
            rows={6}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
          />
        </div>
        {errors.review && (
          <p className="text-red-500 text-sm -mt-6">{errors.review}</p>
        )}

        <div>
          <label className="block text-sm mb-1">
            Picture/Video <span className="text-gray-500">(optional)</span>
          </label>
          <div className="flex items-center gap-4">
            <label
              onDragOver={(e) => e.preventDefault()} // ✅ allow drop
              onDrop={handleDrop} // ✅ handle drop
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-6 h-6 text-gray-400" />
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </label>
            {media.map((file, index) => (
              <div
                key={index}
                className="w-24 h-24 border border-gray-200 rounded-lg relative"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setMedia(media.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {errors.file && (
            <p className="text-red-500 text-sm -mt-6">{errors.file}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">YouTube URL</label>
          <input
            id="url"
            type="url"
            value={reviewData.url}
            onChange={handleChange}
            placeholder="YouTube URL"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Name{" "}
            <span className="text-gray-500">
              (displayed publicly like John Smith)
            </span>
          </label>
          <input
            id="name"
            type="text"
            value={reviewData.name}
            onChange={handleChange}
            placeholder="Enter your name (public)"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm -mt-5">{errors.name}</p>
        )}

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={reviewData.email}
            onChange={handleChange}
            placeholder="Enter your email (private)"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm -mt-5">{errors.email}</p>
        )}

        <div className="text-sm text-gray-600">
          <p>
            How we use your data: We&apos;ll only contact you about the review
            you left, and only if necessary. By submitting your review, you
            agree to Judge.me&apos;s terms, privacy and content policies.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            CANCEL REVIEW
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-black/90 cursor-pointer"
          >
            SUBMIT REVIEW
          </button>
        </div>
      </form>
    </div>
  );
}
