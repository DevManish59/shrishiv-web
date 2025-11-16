"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, Box } from "lucide-react";
import FullscreenModal from "@/components/ui/fullscreen-modal";
import Model3DViewer from "@/components/ui/3d-model-viewer";

interface ProductGalleryProps {
  product: {
    name: string;
    images: string[];
    is3DViewEnabled: boolean;
  };
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Touch gesture states
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);

  const handleImageError = (index: number) => {
    setImageError((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const open3DModal = () => {
    setIs3DModalOpen(true);
  };

  const close3DModal = () => {
    setIs3DModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
    if (zoomLevel <= 1) {
      setPanPosition({ x: 0, y: 0 });
    }
  };

  // Calculate distance between two touch points
  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Single touch - pan or swipe navigation
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      // Two touches - pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      setInitialDistance(getDistance(touch1, touch2));
      setInitialZoom(zoomLevel);
      setIsDragging(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default scrolling

    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;

      if (zoomLevel === 1) {
        // At normal scale, allow horizontal swipe navigation
        // Only trigger navigation if the horizontal movement is significant
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) {
            // Swipe right - go to previous image
            prevImage();
          } else {
            // Swipe left - go to next image
            nextImage();
          }
          setIsDragging(false);
          return;
        }
      } else {
        // Zoomed in - allow panning with boundaries
        setPanPosition((prev) => {
          const newX = prev.x + deltaX;
          const newY = prev.y + deltaY;

          // Calculate boundaries based on zoom level
          const maxPanX = Math.max(
            0,
            ((zoomLevel - 1) * window.innerWidth) / 2
          );
          const maxPanY = Math.max(
            0,
            ((zoomLevel - 1) * window.innerHeight) / 2
          );

          return {
            x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
            y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
          };
        });
      }

      setTouchStart({ x: touch.clientX, y: touch.clientY });
    } else if (e.touches.length === 2) {
      // Two touch pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = getDistance(touch1, touch2);

      if (initialDistance > 0) {
        const scale = currentDistance / initialDistance;
        const newZoom = Math.max(0.5, Math.min(3, initialZoom * scale));
        setZoomLevel(newZoom);

        // Reset pan when zoom is 1 or less
        if (newZoom <= 1) {
          setPanPosition({ x: 0, y: 0 });
        } else {
          // Constrain pan position for new zoom level
          setPanPosition((prev) => {
            const maxPanX = Math.max(
              0,
              ((newZoom - 1) * window.innerWidth) / 2
            );
            const maxPanY = Math.max(
              0,
              ((newZoom - 1) * window.innerHeight) / 2
            );

            return {
              x: Math.max(-maxPanX, Math.min(maxPanX, prev.x)),
              y: Math.max(-maxPanY, Math.min(maxPanY, prev.y)),
            };
          });
        }
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialDistance(0);
  };

  // Pan/Drag functionality for mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Calculate boundaries based on zoom level
      const maxPanX = Math.max(0, ((zoomLevel - 1) * window.innerWidth) / 2);
      const maxPanY = Math.max(0, ((zoomLevel - 1) * window.innerHeight) / 2);

      setPanPosition({
        x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="lg:col-span-3 lg:max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="grid grid-cols-2 gap-1">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] cursor-pointer group"
              onClick={() => openModal(index)}
            >
              <Image
                src={imageError[index] ? "/logo.png" : image}
                alt={`${product.name} - View ${index + 1}`}
                fill
                className={`object-${
                  imageError[index] ? "contain" : "cover"
                } transition-transform`}
                sizes="(max-width: 768px) 50vw, 30vw"
                priority={index === 0}
                onError={() => handleImageError(index)}
              />

              {/* 3D View Button */}
              {index === 0 && product.is3DViewEnabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    open3DModal();
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="View in 3D"
                >
                  <Box className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery Fullscreen Modal */}
      <FullscreenModal
        isOpen={isModalOpen}
        onClose={closeModal}
        showNavigation={true}
        onNext={nextImage}
        onPrev={prevImage}
        currentIndex={currentImageIndex}
        totalItems={product.images.length}
      >
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            cursor:
              zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            touchAction: "none", // Prevent default touch behaviors
          }}
        >
          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 0.5}
              className="bg-white bg-opacity-20 text-white p-2 rounded hover:bg-opacity-30 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <ZoomOut className="w-6 h-6" color="black" />
            </button>
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 3}
              className="bg-white bg-opacity-20 text-white p-2 rounded hover:bg-opacity-30 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <ZoomIn className="w-6 h-6" color="black" />
            </button>
          </div>

          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
              transition: isDragging ? "none" : "transform 0.3s ease",
            }}
          >
            <Image
              src={
                imageError[currentImageIndex]
                  ? "/logo.png"
                  : product.images[currentImageIndex]
              }
              alt={`${product.name} - View ${currentImageIndex + 1}`}
              fill
              className={`object-${
                imageError[currentImageIndex] ? "contain" : "cover"
              } max-w-none`}
              sizes="100vw"
              priority
              onError={() => handleImageError(currentImageIndex)}
              draggable={false}
            />
          </div>
        </div>
      </FullscreenModal>

      {/* 3D Model Fullscreen Modal */}
      <FullscreenModal
        isOpen={is3DModalOpen}
        onClose={close3DModal}
        showCloseButton={true}
      >
        <Model3DViewer
          // modelUrl={`/api/3d-models/${product.name
          //   .toLowerCase()
          //   .replace(/\s+/g, "-")}`}
          modelUrl={"/sample.glb"}
          // fallbackImage={product.images[0]}
          title={`${product.name} - 3D Model`}
        />
      </FullscreenModal>
    </>
  );
}
