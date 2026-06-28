import { MinusIcon, PluseIcon } from "../../assets/Icon";

const Counter = ({
  variant = "primary",
  value = 0,
  onChange,
  maxValue = 10,
  minValue = 0,
  containerClassName,
}) => {
  const styles = {
    primary: {
      active: "bg-neutral-50 cursor-pointer",
      disabled: "border-[2px] border-disabled bg-white cursor-default",
    },
    secondary: {
      active: "bg-white cursor-pointer ",
      disabled: "bg-white",
    },
  };

  const iconStyle = {
    primary: {
      active: "var(--color-neutral-500)",
      disabled: "var(--color-disabled)",
    },
  };

  const currentStyle = styles[variant] ?? styles.primary;
  const currentIconStyle = iconStyle[variant] ?? iconStyle.primary;

  const isMin = value <= minValue;
  const isMax = value >= maxValue;
  const handleOnIncrease = () => {
    if (!isMax) {
      onChange(value + 1);
    }
  };
  const handleOnDecrease = () => {
    if (!isMin) {
      onChange(value - 1);
    }
  };
  return (
    <div
      className={`flex items-center justify-between  ${containerClassName ?? ""} `}
    >
      <button
        disabled={isMin}
        onClick={handleOnDecrease}
        className={`flex size-5 flex items-center justify-center rounded-sm ${isMin ? currentStyle?.disabled : currentStyle?.active}`}
      >
        <MinusIcon fill={currentIconStyle?.[isMin ? "disabled" : "active"]} />
      </button>
      <span className="body_lg text-neutral-900">{value ?? 0}</span>
      <button
        disabled={isMax}
        onClick={handleOnIncrease}
        className={`flex size-5 flex items-center justify-center rounded-sm ${isMax ? currentStyle?.disabled : currentStyle?.active}`}
      >
        <PluseIcon fill={currentIconStyle?.[isMax ? "disabled" : "active"]} />
      </button>
    </div>
  );
};

export default Counter;
