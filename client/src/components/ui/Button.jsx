import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  text,
  variant,
  handleClick,
  disabled,
  size = "lg",
  ariaLabel,
  className,
  to,
}) => {
  const navigate = useNavigate();
  const sizes = {
    lg: "h-12 rounded-sm px-4 py-[13px] gap-2 headline_lg",
    md: "h-[39px] px-6 py-[5px] gap-2.5 rounded-[7px] title_xl",
  };
  const styles = {
    primary: "bg-primary-700 text-white",
    secondary: "border border-primary-700 text-primary-700 ",
  };
  return (
    <button
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
        if (to) {
          navigate(to);
        }
      }}
      className={`flex items-center justify-center text-center  ${styles[variant ?? "primary"]} ${className ?? ""} ${sizes[size ?? "lg"]} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
