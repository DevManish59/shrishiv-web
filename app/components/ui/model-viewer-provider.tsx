"use client";

import { useEffect } from "react";
import { loadModelViewer } from "@/lib/model-viewer-loader";
import { useLocation } from "@/hooks/useLocation";

interface ModelViewerProviderProps {
  children: React.ReactNode;
  preload?: boolean;
}

export default function ModelViewerProvider({
  children,
  preload = false,
}: ModelViewerProviderProps) {
  const { location, loading } = useLocation();

  useEffect(() => {
    if (preload) {
      // Preload Model Viewer script when app starts
      loadModelViewer().catch(() => {
        console.log("Model Viewer preload failed");
      });
    }
  }, [preload]);

  return <>{children}</>;
}
