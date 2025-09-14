// Model Viewer Script Loader
// Loads the Google Model Viewer script once for the entire application

let isScriptLoaded = false;
let isScriptLoading = false;
let loadPromise: Promise<void> | null = null;

export const loadModelViewer = (): Promise<void> => {
  // If already loaded, return immediately
  console.log("isScriptLoaded", isScriptLoaded);
  if (isScriptLoaded) {
    return Promise.resolve();
  }

  // If already loading, return the existing promise
  if (isScriptLoading && loadPromise) {
    return loadPromise;
  }

  // Check if script is already in the DOM
  if (customElements.get("model-viewer")) {
    isScriptLoaded = true;
    return Promise.resolve();
  }

  // Start loading
  isScriptLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    
    script.onload = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      resolve();
    };
    
    script.onerror = () => {
      isScriptLoading = false;
      reject(new Error("Failed to load Model Viewer script"));
    };
    
    document.head.appendChild(script);
  });

  return loadPromise;
};

export const isModelViewerAvailable = (): boolean => {
  return isScriptLoaded || customElements.get("model-viewer") !== undefined;
}; 