import React from "react";

export const __TemplateSVG: ISvgComponent = ({
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
      viewBox="0 0 22 19"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ...CONTENT... */}
    </svg>
  );
};
