import React from "react";

export const CloseButtonSVG: ISvgComponent = ({
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
        d="M76 25.64L70.36 20L48 42.36L25.64 20L20 25.64L42.36 48L20 70.36L25.64 76L48 53.64L70.36 76L76 70.36L53.64 48L76 25.64Z"
        fill="currentColor"
      />
    </svg>
  );
};
