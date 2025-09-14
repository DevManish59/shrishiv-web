import { Star as StarIcon } from "lucide-react";

interface StarProps {
  className?: string;
}

export default function Star({ className }: StarProps) {
  return <StarIcon className={className} />;
}
