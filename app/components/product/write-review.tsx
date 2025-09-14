"use client";

import { useState } from "react";
import Star from "@/components/ui/star";
import { Upload } from "lucide-react";

interface WriteReviewProps {
  onCancel: () => void;
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
    name: string;
    email: string;
    media?: File[];
    youtubeUrl?: string;
  }) => void;
}

export default function WriteReview({ onCancel, onSubmit }: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [media, setMedia] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      title,
      comment,
      name,
      email,
      media,
      youtubeUrl,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMedia(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full md:max-w-2xl mx-auto py-8 px-4 md:px-0">
      <div className="flex justify-center items-center mb-8">
        <div>
          <h2 className="text-2xl font-medium">Write a review</h2>
          <div className="flex flex-col items-center gap-2 mt-2 justify-center">
            <p className="text-sm text-gray-500">Rating</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      value <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">
            Review Title <span className="text-xs text-gray-500">(100)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            placeholder="Give your review a title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comments here"
            rows={6}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Picture/Video <span className="text-gray-500">(optional)</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <Upload className="w-6 h-6 text-gray-400" />
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
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
                  className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">YouTube URL</label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
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
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (public)"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email (private)"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/5"
            required
          />
        </div>

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
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            CANCEL REVIEW
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-black/90"
          >
            SUBMIT REVIEW
          </button>
        </div>
      </form>
    </div>
  );
}
