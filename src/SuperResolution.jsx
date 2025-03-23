import React, { useState } from "react";
import ImageComparision from "./ImageComparision";
import Loader from "./ui-component/Loader"; // Import your loader component

// Default images (assuming they're in public/images/)
const DEFAULT_BEFORE = "../public/assets/Noised-image.png";
const DEFAULT_AFTER = "../public/assets/HD-image.jpg";

const SuperResolution = () => {
  // Slider images (initially your example images)
  const [beforeImage, setBeforeImage] = useState(DEFAULT_BEFORE);
  const [afterImage, setAfterImage] = useState(DEFAULT_AFTER);

  // Temporary storage for user input (not shown in slider yet)
  const [tempFile, setTempFile] = useState(null);
  const [tempUrl, setTempUrl] = useState("");

  // Loader state
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempFile(file);
      setTempUrl("");
    } else {
      alert("No image uploaded! Please choose an image first.");
    }
  };

  const handleUrlChange = (event) => {
    setTempUrl(event.target.value);
    setTempFile(null);
  };

  // Track "mode" in state (for demonstration)
  const [mode, setMode] = useState("standard");
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  // Generate: only now do we update the slider images and show a loader
  const handleGenerate = () => {
    console.log("Mode:", mode);
    console.log("Temp File:", tempFile);
    console.log("Temp URL:", tempUrl);

    // Check if neither file nor URL is provided
    if (!tempFile && !tempUrl) {
      alert("No image uploaded! Please select an image first.");
      return;
    }

    // Update the "before" image from tempFile or tempUrl
    if (tempFile) {
      const localFileUrl = URL.createObjectURL(tempFile);
      setBeforeImage(localFileUrl);
    } else if (tempUrl) {
      setBeforeImage(tempUrl);
    }

    // Show loader for 2 seconds while simulating API call
    setLoading(true);
    setTimeout(() => {
      const simulatedSRUrl =
        "https://via.placeholder.com/600x400/444444/ffffff?text=Super+Resolution+Result";
      setAfterImage(simulatedSRUrl);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-bold mt-10">Super Resolution</h1>
      <p className="max-w-4xl text-center mt-4 text-gray-400 text-lg">
        The Super Resolution API uses machine learning to clarify, sharpen, and
        upscale the photo without losing its content and defining
        characteristics. Blurry images are unfortunately common. Super
        resolution upscales images in seconds.
      </p>

      {/* Main Container */}
      <div className="w-full bg-gray-800 p-10 rounded-3xl border-2 border-gray-700 max-w-5xl mt-10 flex flex-col md:flex-row md:space-x-8">
        {/* Left Panel - Upload/URL */}
        <div className="flex-1 mb-8 md:mb-0 max-w-xs">
          <div className="flex flex-col items-center border-2 border-dashed border-gray-600 p-8 rounded-3xl">
            <p className="mb-4">
              Upload an image <span className="text-sm">(or enter a URL)</span>
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full bg-gray-700 text-gray-400 border border-gray-700 rounded p-2"
              style={{ appearance: "auto" }}
            />
            <p className="text-sm mt-2 mb-2">OR</p>
            <input
              type="text"
              placeholder="Enter image URL"
              value={tempUrl}
              onChange={handleUrlChange}
              className="w-full bg-gray-700 rounded p-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Mode Selection */}
          <div className="flex justify-center space-x-4 mt-6 bg-gray-700 p-2 rounded-2xl">
            <button
              className={`w-full px-5 py-2 rounded-xl ${
                mode === "standard" ? "bg-purple-600" : "bg-gray-700"
              }`}
              onClick={() => handleModeChange("standard")}
            >
              Standard
            </button>
            <button
              className={`w-full px-5 py-2 rounded-xl ${
                mode === "creative" ? "bg-purple-600" : "bg-gray-700"
              }`}
              onClick={() => handleModeChange("creative")}
            >
              Creative
            </button>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mt-6">
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-3xl transition"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>

        {/* Right Panel - Comparison Slider / Loader */}
        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <Loader />
          ) : (
            <ImageComparision beforeImage={beforeImage} afterImage={afterImage} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-sm mt-20">
        <p>© 2025 My Super Resolution Model</p>
      </div>
    </div>
  );
};

export default SuperResolution;
