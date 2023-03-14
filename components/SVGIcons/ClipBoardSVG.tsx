import React from "react";

export const ClipBoardSVG: ISvgComponent = ({
  color = "red",
  width = "96",
  height = "96",
  className = "text-red-700",
}) => {
  return (
    <svg
      height={height}
      fill={color}
      className={className}
      viewBox="0 0 96 96"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M76 12H59.28C57.6 7.36 53.2 4 48 4C42.8 4 38.4 7.36 36.72 12H20C15.6 12 12 15.6 12 20V76C12 80.4 15.6 84 20 84H76C80.4 84 84 80.4 84 76V20C84 15.6 80.4 12 76 12ZM48 12C50.2 12 52 13.8 52 16C52 18.2 50.2 20 48 20C45.8 20 44 18.2 44 16C44 13.8 45.8 12 48 12ZM56 68H28V60H56V68ZM68 52H28V44H68V52ZM68 36H28V28H68V36Z"
        fill="currentColor"
      />
    </svg>
  );
};
