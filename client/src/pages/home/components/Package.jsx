import { useCart } from "../../../providers/CartProvider";

const Package = ({ data }) => {
  const { cartData, togglePlan } = useCart();

  const isSelected = cartData
    ?.find((c) => c.name === "Plan")
    ?.items?.some((i) => i.packageId === data?.id);

  const billingLabel =
    data?.billingCycle === "month"
      ? " /mo"
      : data?.billingCycle === "year"
        ? " /yr"
        : "";
  const titleParts = data?.title?.split(" ") || [];
  return (
    <div
      onClick={() => togglePlan({ plan: data })}
      className={`flex flex-col gap-[19px] border ${isSelected ? "border-primary-700" : "border-transparent"} max-w-[360px] h-full  bg-white p-[11px] rounded-[10px]  `}
    >
      <div className="flex flex-col  gap-2">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-[3px]">
            <img
              src={data?.icon}
              alt={`${data?.name}-product`}
              className="w-5"
            />
            <h2 className="label_lg_bold leading-[16px] flex gap-1">
              {titleParts.map((word, index) => (
                <span
                  key={index}
                  className={
                    index === 0 ? "text-neutral-950" : "text-primary-700"
                  }
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <div className="ms-auto space-x-1.5 gap-[3px]">
            {data?.priceBeforeDiscount && (
              <span className="line-through decoration-1 text-error-500 label_lg tracking-[.6px]">
                {`$${data?.priceBeforeDiscount}${billingLabel}`}
              </span>
            )}

            <span className="label_lg tracking-[.6px] text-neutral-600">
              {data?.price > 0 ? `$${data?.price}${billingLabel}` : "FREE"}
            </span>
          </div>
        </header>
        {data?.features?.length > 0 && (
          <ul className="flex flex-col gap-2 mt-2">
            {data?.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                {/* circle icon */}
                <span
                  className={`mt-[6px] size-[5px] rounded-full border border-neutral-950/75 `}
                />

                <span className={`body_sm text-neutral-950/75`}>
                  {feature?.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Package;
