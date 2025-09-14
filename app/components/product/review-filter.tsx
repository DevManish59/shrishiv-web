"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ReviewFilterType =
  | "most_recent"
  | "highest_rating"
  | "lowest_rating"
  | "with_photos"
  | "with_videos"
  | "most_helpful";

interface ReviewFilterProps {
  value: ReviewFilterType;
  onChange: (value: ReviewFilterType) => void;
}

export default function ReviewFilter({ value, onChange }: ReviewFilterProps) {
  return (
    <div className="flex items-center justify-end">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most_recent">Most Recent</SelectItem>
          <SelectItem value="highest_rating">Highest Rating</SelectItem>
          <SelectItem value="lowest_rating">Lowest Rating</SelectItem>
          <SelectItem value="with_photos">With Photos</SelectItem>
          <SelectItem value="with_videos">With Videos</SelectItem>
          <SelectItem value="most_helpful">Most Helpful</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
