const Chip = ({ img, label, selected, onChange }) => {
  return (
    <button
      className={` cursor-pointer border-[.5px] rounded-xs flex items-center  px-[3.5px] lg:px-[5px] h-[26px] overflow-hidden ${selected ? "border-tertiary-500 bg-tertiary-400/4" : "bg-white  border-grey-500"} w-fit`}
      onClick={onChange}
    >
      {img && <img src={img} alt={label} className="w-[26px]! object-cover" />}
      {label && (
        <span className="text-neutral-950 body_xs tracking-[.6px]">
          {label}
        </span>
      )}
    </button>
  );
};

export default Chip;
