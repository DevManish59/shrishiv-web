"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalItems?: number;
  showCloseButton?: boolean;
  className?: string;
}

export default function FullscreenModal({
  isOpen,
  onClose,
  children,
  showNavigation = false,
  onNext,
  onPrev,
  currentIndex,
  totalItems,
  showCloseButton = true,
  className = "",
}: FullscreenModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="bg-white rounded absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors cursor-pointer"
          >
            <X className="w-8 h-8" color="black" />
          </button>
        )}

        {/* Navigation Buttons */}
        {showNavigation && onNext && onPrev && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" color="black" />
            </button>

            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" color="black" />
            </button>
          </>
        )}

        {/* Content */}
        <div
          className={`w-full h-full flex items-center justify-center ${className}`}
        >
          {children}
        </div>

        {/* Counter */}
        {showNavigation && currentIndex !== undefined && totalItems && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
            {currentIndex + 1} / {totalItems}
          </div>
        )}
      </div>
    </div>
  );
}
