import React from "react";

export const ArrowDownSVG: ISvgComponent = ({
  color = "#d6d3d1",
  width = "100%",
  height = "100%",
  className = "fill-red-300",
  strokeWidth = "2.5",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      className={className}
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
