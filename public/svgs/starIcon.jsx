import React from "react";

function StarIcon({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 58 55"
    >
      <path
        fill={color}
        d="M29 0l6.735 20.73h21.797L39.898 33.54l6.736 20.73L29 41.459 11.366 54.27l6.736-20.729L.468 20.73h21.797L29 0z"
      ></path>
    </svg>
  );
}

export default StarIcon;