import React, { useState } from "react";
import ImageComparision from "./ImageComparision";
import Loader from "./ui-component/Loader"; // Import your loader component

// Default images (used for image mode)
const DEFAULT_BEFORE_IMAGE = "../assets/Noised-image.png";
const DEFAULT_AFTER_IMAGE = "../assets/HD-image.jpg";

const SuperResolution = () => {
  // Unified state for the media (image or video)
  const [beforeMedia, setBeforeMedia] = useState(DEFAULT_BEFORE_IMAGE);
  const [afterMedia, setAfterMedia] = useState(DEFAULT_AFTER_IMAGE);

  // Temporary storage for user input
  const [tempFile, setTempFile] = useState(null);
  const [tempUrl, setTempUrl] = useState("");

  // Loader state
  const [loading, setLoading] = useState(false);

  // Track media type (image vs video)
  const [mediaType, setMediaType] = useState("image");
  const handleMediaTypeChange = (type) => {
    setMediaType(type);
    // Reset temporary inputs when switching types
    setTempFile(null);
    setTempUrl("");
    // Reset media preview based on type
    if (type === "image") {
      setBeforeMedia(DEFAULT_BEFORE_IMAGE);
      setAfterMedia(DEFAULT_AFTER_IMAGE);
    } else {
      setBeforeMedia("");
      setAfterMedia("");
    }
  };

  // Helper functions to detect YouTube URLs and convert them to embed URLs
  const isYouTubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const convertToYouTubeEmbedUrl = (url) => {
    let videoId = "";
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtu.be")) {
        videoId = parsedUrl.pathname.slice(1);
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        videoId = parsedUrl.searchParams.get("v");
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (err) {
      return url;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempFile(file);
      setTempUrl("");
    } else {
      alert(`No ${mediaType} uploaded! Please choose a ${mediaType} first.`);
    }
  };

  const handleUrlChange = (event) => {
    setTempUrl(event.target.value);
    setTempFile(null);
  };

  // Generate: update media and simulate processing
  const handleGenerate = () => {
    console.log("Media Type:", mediaType);
    console.log("Temp File:", tempFile);
    console.log("Temp URL:", tempUrl);

    if (!tempFile && !tempUrl) {
      alert(`No ${mediaType} uploaded! Please select a ${mediaType} first.`);
      return;
    }

    // Update the "before" media from tempFile or tempUrl
    if (tempFile) {
      const localFileUrl = URL.createObjectURL(tempFile);
      setBeforeMedia(localFileUrl);
    } else if (tempUrl) {
      setBeforeMedia(tempUrl);
    }

    // Show loader for 2 seconds while simulating processing
    setLoading(true);
    setTimeout(() => {
      if (mediaType === "image") {
        const simulatedSRImageUrl =
          "https://via.placeholder.com/600x400/444444/ffffff?text=Super+Resolution+Result";
        setAfterMedia(simulatedSRImageUrl);
      } else {
        // For video mode, if URL is a YouTube link, convert it to an embed URL; otherwise, use the same video
        if (tempUrl && isYouTubeUrl(tempUrl)) {
          const embedUrl = convertToYouTubeEmbedUrl(tempUrl);
          setAfterMedia(embedUrl);
        } else {
          setAfterMedia(beforeMedia);
        }
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-bold mt-10">
        Surveilpro : Unblur the Truth
      </h1>
      <p className="max-w-4xl text-center mt-4 text-gray-400 text-lg">
        Leveraging advanced machine learning techniques, our Super Resolution
        model is meticulously engineered to enhance and upscale your media while
        preserving intrinsic details and defining characteristics. Particularly
        for CCTV footage—where low resolution and blurred imagery are common
        challenges—our solution delivers rapid and precise upscaling,
        significantly improving clarity and detail in mere seconds.
      </p>

      {/* Main Container */}
      <div className="w-full bg-gray-800 p-10 rounded-3xl border-2 border-gray-700 max-w-5xl mt-10 flex flex-col md:flex-row md:space-x-8">
        {/* Left Panel - Media Type Selection and Upload/URL */}
        <div className="flex-1 mb-8 md:mb-0 max-w-xs">
          {/* Media Type Toggle */}
          <div className="flex justify-center space-x-4 mb-4 bg-gray-700 p-2 rounded-2xl">
            <button
              className={`w-full px-5 py-2 rounded-xl ${
                mediaType === "image" ? "bg-purple-600" : "bg-gray-700"
              }`}
              onClick={() => handleMediaTypeChange("image")}
            >
              Image
            </button>
            <button
              className={`w-full px-5 py-2 rounded-xl ${
                mediaType === "video" ? "bg-purple-600" : "bg-gray-700"
              }`}
              onClick={() => handleMediaTypeChange("video")}
            >
              Video
            </button>
          </div>

          {/* Upload/URL Input */}
          <div className="flex flex-col items-center border-2 border-dashed border-gray-600 p-8 rounded-3xl">
            <p className="mb-4">
              Upload a {mediaType} <span className="text-sm">(or enter a URL)</span>
            </p>
            <input
              type="file"
              accept={mediaType === "image" ? "image/*" : "video/*"}
              onChange={handleFileUpload}
              className="w-full bg-gray-700 text-gray-400 border border-gray-700 rounded p-2"
              style={{ appearance: "auto" }}
            />
            <p className="text-sm mt-2 mb-2">OR</p>
            <input
              type="text"
              placeholder={
                mediaType === "image" ? "Enter image URL" : "Enter video URL"
              }
              value={tempUrl}
              onChange={handleUrlChange}
              className="w-full bg-gray-700 rounded p-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
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

        {/* Right Panel - Comparison / Preview Section */}
        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <Loader />
          ) : mediaType === "image" ? (
            <ImageComparision
              beforeImage={beforeMedia}
              afterImage={afterMedia}
            />
          ) : (
            <div className="flex flex-col items-center">
              {afterMedia ? (
                <>
                  {afterMedia.includes("youtube.com/embed") ? (
                    <iframe
                      src={afterMedia}
                      allowFullScreen
                      title="Video Preview"
                      className="max-w-full rounded"
                      style={{ width: "100%", height: "400px" }}
                    />
                  ) : (
                    <video controls className="max-w-full rounded">
                      <source src={afterMedia} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {!afterMedia.includes("youtube.com/embed") && (
                    <a
                      href={afterMedia}
                      download
                      className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-3xl transition text-center inline-block mt-4"
                    >
                      Download Video
                    </a>
                  )}
                </>
              ) : (
                <p className="text-gray-400">
                  Your video result will appear here.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-sm mt-20">
        <p>© 2025 Surveilpro made with ♥ by Gaurav & Raj</p>
      </div>
    </div>
  );
};

export default SuperResolution;
