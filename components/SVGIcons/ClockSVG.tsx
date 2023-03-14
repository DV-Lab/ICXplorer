import React from "react";

export const ClockSVG: ISvgComponent = ({
  color = "green",
  width = "100%",
  height = "100%",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 80 81"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M80 15.88L61.6 0.440002L56.44 6.56L74.84 22L80 15.88ZM23.52 6.56L18.4 0.440002L0 15.84L5.16 21.96L23.52 6.56ZM42 25H36V49L55 60.4L58 55.48L42 46V25ZM40 9C20.12 9 4 25.12 4 45C4 64.88 20.08 81 40 81C59.88 81 76 64.88 76 45C76 25.12 59.88 9 40 9ZM40 73C24.52 73 12 60.48 12 45C12 29.52 24.52 17 40 17C55.48 17 68 29.52 68 45C68 60.48 55.48 73 40 73Z"
        fill="currentColor"
      />
    </svg>
  );
};
