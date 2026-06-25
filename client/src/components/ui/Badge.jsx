import React from "react";

const Badge = ({ variant = "primary", text, className }) => {
  const styles = {
    primary: "bg-primary-700 text-white",
  };
  return (
    <span
      className={` py-0.5 px-1.5 rounded-full flex items-center justify-center w-fit h-[19px] title_sm ${className ?? ""} ${styles[variant ?? "primary"]}`}
    >
      {text}
    </span>
  );
};

export default Badge;
