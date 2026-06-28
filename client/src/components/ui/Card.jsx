import { useState } from "react";
import Badge from "./Badge";
import Chip from "./Chip";
import Counter from "./Counter";
import { useCart } from "../../providers/CartProvider";

const Card = ({ data, categoryId }) => {
  const { getMatchedItem, updateCartItem, hasSelectedVariant } = useCart();
  const [activeVariant, setActiveVariant] = useState(data?.variants?.at(0));

  const matchedItem = getMatchedItem(data.id, activeVariant?.id);
  const selectedProdcut = hasSelectedVariant(data.id);
  return (
    <div
      className={` border ${selectedProdcut ? "border-primary-700" : "border-transparent"} max-w-[360px] xl:h-full  bg-white p-[11px] rounded-[10px] flex items-center flex-col xl:flex-row gap-[13px] xl:gap-[19px] `}
    >
      <figure className="w-full h-[117px] sm:h-[146px] xl:w-[101px] xl:h-[137px] relative">
        {data?.badge && (
          <Badge text={data?.badge} className="absolute top-0 start-0" />
        )}
        <img
          src={activeVariant?.thumbnail ?? data?.image}
          alt={`${data?.name}-product`}
          className=" w-full max-h-[117px] sm:max-h-[146px]  xl:max-w-full xl:h-full object-contain xl:object-cover"
        />
      </figure>
      {/* content */}
      <div
        className={`xl:flex-1 flex flex-col gap-2.5  ${data?.variants?.length >= 3 ? "xl:max-w-[219px]" : "xl:max-w-[205px]"}`}
      >
        <header className="grid gap-1 ">
          <h2 className="title_lg text-neutral-950 truncate leading-[16px]">
            {data?.name ?? ""}
          </h2>
          <p className="text-neutral-950/75 body_sm">
            {data?.description}{" "}
            <button
              type="button"
              className="text-secondary-700 underline cursor-pointer"
            >
              Learn more
            </button>
          </p>
        </header>
        {/* variants */}
        {data?.variants?.length > 0 ? (
          <ul className="flex items-center flex-wrap gap-1.5">
            {data?.variants?.map((v) => (
              <li key={v?.id}>
                <Chip
                  img={v?.thumbnail}
                  label={v?.label}
                  selected={v?.id === activeVariant?.id}
                  onChange={() => setActiveVariant(v)}
                />
              </li>
            ))}
          </ul>
        ) : null}

        {/* price */}
        <footer className="flex items-center gap-2.5 ">
          <Counter
            value={matchedItem?.quantity ?? 0}
            onChange={(v) =>
              updateCartItem({
                categoryId,
                productId: data.id,
                variantId: activeVariant?.id,
                quantity: v,
                product: data,
                variant: activeVariant,
                type: "product",
              })
            }
            maxValue={data?.quantity ?? activeVariant?.quantity}
            containerClassName="w-[80px] px-[5.5px] py-[7.5px]"
          />
          <div className="flex flex-col  items-end flex-1 gap-[3px] ">
            {data?.priceBeforeDiscount && (
              <span className="line-through decoration-1 text-error-500 label_lg tracking-[.6px]">
                {`$${data?.priceBeforeDiscount}`}
              </span>
            )}
            <span className="label_lg tracking-[.6px] text-neutral-600 ">
              {data?.price > 0 ? `$${data?.price}` : "FREE"}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Card;
