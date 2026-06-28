import React from "react";
import Counter from "../../../components/ui/Counter";
import { useCart } from "../../../providers/CartProvider";

const CartItem = ({ data, categoryId }) => {
  return data?.type === "product" ? (
    <ProductItem data={data} categoryId={categoryId} />
  ) : (
    <PackageItem data={data} />
  );
};
const ProductItem = ({ data, categoryId }) => {
  const { updateCartItem } = useCart();
  const totalPrice = Number(data?.price || 0) * Number(data?.quantity || 1);
  const totalBeforeDiscount =
    Number(data?.priceBeforeDiscount || 0) * Number(data?.quantity || 1);
  console.log(data, "sss");
  return (
    <div className="w-full flex items-center gap-4 ">
      <div className="flex items-center w-full  justify-between gap-3">
        <figure className="size-[41px] bg-white flex items-center justify-center">
          <img
            src={data?.thumbnail}
            className="w-full "
            alt={data?.variantLabel}
          />
        </figure>
        <h4 className="flex-1 body_md tracking-[.6px] text-[#0B0D10]">
          {data?.title}
        </h4>
        <Counter
          value={data?.quantity}
          containerClassName={"w-[72px] h-[28px] "}
          variant="secondary"
          onChange={(v) => {
            updateCartItem({
              categoryId,
              productId: data?.productId,
              variantId: data?.variantId,
              quantity: v,
              product: {
                name: data?.title,
                price: data?.price,
                priceBeforeDiscount: data?.priceBeforeDiscount,
              },
              variant: {
                thumbnail: data?.thumbnail,
              },
            });
          }}
        />
      </div>
      <div className="flex flex-col  items-end flex-1 gap-[3px] ">
        {totalBeforeDiscount > 0 && (
          <span className="line-through decoration-1 text-[#6F7882] body_md tracking-[.6px]">
            {`$${totalBeforeDiscount}`}
          </span>
        )}
        <span className="title_md tracking-[.6px] text-primary-700 ">
          {totalPrice > 0 ? `$${totalPrice.toFixed(2)}` : "FREE"}
        </span>
      </div>
    </div>
  );
};
const PackageItem = ({ data }) => {
  const billingLabel =
    data?.billingCycle === "month"
      ? "/mo"
      : data?.billingCycle === "year"
        ? "/yr"
        : "";
  const titleParts = data?.title?.split(" ") || [];
  return (
    <div className=" flex items-start gap-2 justify-between">
      <div className="flex items-center gap-[3px] flex-1">
        <img src={data?.icon} alt={`${data?.name}-product`} className="w-5" />
        <h2 className="label_lg_bold  -tracking-[.2px] flex gap-1">
          {titleParts.map((word, index) => (
            <span
              key={index}
              className={index === 0 ? "text-neutral-950" : "text-primary-700"}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
      <div className="flex flex-col  items-end flex-1 gap-[3px] ">
        {data?.priceBeforeDiscount && (
          <span className="line-through decoration-1 text-[#6F7882] body_md tracking-[.6px]">
            {`$${data?.priceBeforeDiscount}${billingLabel}`}
          </span>
        )}
        <span className="title_md tracking-[.6px] text-primary-700 ">
          {data?.price > 0 ? `$${data?.price}${billingLabel}` : "FREE"}
        </span>
      </div>
    </div>
  );
};
export default CartItem;
