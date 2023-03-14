import React from "react";

export const UserSVG: ISvgComponent = ({
  color = "green",
  width = "100%",
  height = "100%",
  className = "",
}) => {
  return (
    <svg
      height={height}
      fill={color}
      className={className}
      viewBox="0 0 22 22"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g data-name="Layer 2">
        <path
          d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 10a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z"
          data-name="person"
        />
      </g>
    </svg>
  );
};
