import React from "react";

export const HomeSVG: ISvgComponent = ({
  color = "green",
  width = "100%",
  height = "100%",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      className={className}
      viewBox="0 0 16 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.292893 7.70708C0.105357 7.89462 0 8.14897 0 8.41418V18C0 18.5523 0.447715 19 1 19H15C15.5523 19 16 18.5523 16 18V8.41418C16 8.14897 15.8946 7.89462 15.7071 7.70708L8.70711 0.707078C8.31658 0.316554 7.68342 0.316553 7.29289 0.707078L0.292893 7.70708ZM14 8.8284L8 2.8284L2 8.8284V17H6V12H10V17H14V8.8284Z"
        fill="currentColor"
      />
    </svg>
  );
};
