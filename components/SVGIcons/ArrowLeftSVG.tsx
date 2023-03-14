import React from "react";

export const ArrowLeftSVG: ISvgComponent = ({
  color = "#d6d3d1",
  width = "100%",
  height = "100%",
  className = "fill-red-300",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="3.0"
      stroke={color}
      width={width}
      height={height}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
};
