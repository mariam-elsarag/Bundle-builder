import React from "react";

const Spinner = ({
  size = "md",
  color = "border-primary-700",
  className = "",
}) => {
  const spinnerSize = {
    lg: "w-12 h-12 border-3",
    md: "w-7 h-7 border-2",
    sm: "w-4 h-4 border-2",
  };
  return (
    <div
      className={`rounded-full animate-spin border-t-transparent ${spinnerSize[size]} border ${color} ${className}`}
    ></div>
  );
};

export default Spinner;
