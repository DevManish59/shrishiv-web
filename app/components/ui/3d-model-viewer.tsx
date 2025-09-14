"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  loadModelViewer,
  isModelViewerAvailable,
} from "@/lib/model-viewer-loader";

interface Model3DViewerProps {
  modelUrl?: string;
  fallbackImage?: string;
  title?: string;
  onClose?: () => void;
}

export default function Model3DViewer({
  modelUrl,
  fallbackImage,
  title = "3D Model Viewer",
}: Model3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useModelViewer, setUseModelViewer] = useState(false);
  const [modelViewerError, setModelViewerError] = useState(false);

  // Load Model Viewer script using centralized loader
  useEffect(() => {
    if (!containerRef.current) return;

    // Check if already available
    if (isModelViewerAvailable()) {
      setUseModelViewer(true);
      setIsLoading(false);
      return;
    }

    // Load script using centralized loader
    loadModelViewer()
      .then(() => {
        setUseModelViewer(true);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("Model Viewer failed to load, using fallback");
        setModelViewerError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 ">
        <div>
          <h3 className="text-xl font-semibold text-black">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">
            Interactive 3D Model Viewer
          </p>
        </div>
      </div>

      {/* 3D Viewer */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center overflow-hidden"
      >
        {isLoading ? (
          // Loading State
          <div className="text-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
              <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Loading 3D Model
            </h3>
            <p className="text-black">
              Please wait while we prepare your interactive experience...
            </p>
          </div>
        ) : modelViewerError ? (
          // Error State
          <div className="text-center max-w-md mx-auto">
            <div className="bg-red-500 bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">
              Failed to Load 3D Model
            </h3>
            <p className="text-gray-400 mb-6">
              We couldn&apos;t load the 3D model at this time. This might be due
              to network issues or an unsupported model format.
            </p>
            {fallbackImage && (
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <p className="text-sm text-gray-300 mb-3">
                  Showing product image instead:
                </p>
                <Image
                  src={fallbackImage}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="w-48 h-48 object-contain mx-auto rounded-lg"
                />
              </div>
            )}
          </div>
        ) : useModelViewer && !modelViewerError ? (
          // Google Model Viewer - full width
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <model-viewer
                  src="${
                    modelUrl ||
                    "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                  }"
                  alt="3D Ring Model"
                  poster="${fallbackImage}"
                  shadow-intensity="1"
                  camera-controls
                  touch-action="pan-y"
                  auto-rotate
                  style="width: 100%; height: 100%; border-radius: 12px"
                  loading="eager"
                >
                  <div slot="progress-bar" class="progress-bar">
                    <div class="update-bar"></div>
                  </div>
                </model-viewer>
              `,
            }}
            className="w-full h-full"
          />
        ) : (
          // Fallback State
          <div className="text-center">
            <div className="bg-yellow-500 bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">
              3D Viewer Unavailable
            </h3>
            <p className="text-gray-400 mb-6">
              The 3D viewer couldn&apos;t be loaded. Showing product image
              instead.
            </p>
            {fallbackImage && (
              <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-sm mx-auto">
                <Image
                  src={fallbackImage}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="w-48 h-48 object-contain mx-auto rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-6 bg-white">
        <div className="text-center">
          <p className="text-sm text-black mb-2">
            {useModelViewer && !modelViewerError
              ? "🎮 Drag to rotate • Pinch to zoom"
              : "📱 Interactive product viewing experience"}
          </p>
          <div className="flex justify-center gap-4 text-xs text-black">
            <span>🖱️ Mouse: Click and drag</span>
            <span>📱 Touch: Pinch and swipe</span>
            <span>⌨️ Keyboard: Arrow keys</span>
          </div>
        </div>
      </div>
    </div>
  );
}
