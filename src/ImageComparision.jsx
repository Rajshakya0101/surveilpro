// ImageComparision.jsx
import React from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

const ImageComparision = ({ beforeImage, afterImage }) => {
  return (
    <ReactCompareSlider
      className="max-w-[600px] mx-auto rounded-3xl"
      itemOne={
        <ReactCompareSliderImage
          src={beforeImage}
          alt="Before"
          style={{ objectFit: "contain" }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={afterImage}
          alt="After"
          style={{ objectFit: "contain" }}
        />
      }
    />
  );
};

export default ImageComparision;
