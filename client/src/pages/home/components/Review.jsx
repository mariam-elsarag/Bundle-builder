import { ShippingImg } from "../../../assets/images/Image";
import { useCart } from "../../../providers/CartProvider";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Review = () => {
  const { cartData } = useCart();

  if (cartData?.length > 0)
    return (
      <div className="pt-[15px] pb-[31px] flex flex-col gap-[5px]">
        <p className="px-[15px] body_sm  tracking-[1.6px] text-neutral-700 uppercase">
          Review
        </p>
        <div className="px-5 pt-5 flex flex-col gap-2.5">
          <header className="flex flex-col gap-[5px]">
            <h2 className="title_xxl tracking-[.6px] text-neutral-950">
              Your security system
            </h2>
            <p className="body_md tracking-[.6px] text-neutral-950/75">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </header>
          <div className="">
            <div className="border-t border-[#CED6DE]">
              {cartData?.map((c) => (
                <div key={c?.id} className="border-b border-[#CED6DE] pb-2.5">
                  <h3 className="pt-[15px] pb-2 text-[#A8B2BD] label_sm uppercase tracking-[.5px] w-fit">
                    {c?.name}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {c?.items?.map((cartItem) => (
                      <CartItem
                        data={cartItem}
                        key={cartItem?.id}
                        categoryId={c?.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-[15px] flex items-start gap-4">
              <div className="flex gap-3 items-center">
                <img
                  src={ShippingImg}
                  alt=""
                  aria-hidden={true}
                  className="size-[41px]"
                />
                <p className="body_md text-neutral-900 tracking-[.5px] ">
                  Fast Shipping
                </p>
              </div>
              <div className="flex flex-col  items-end flex-1 gap-[3px] ">
                {
                  <span className="line-through decoration-1 text-[#6F7882] body_md tracking-[.6px]">
                    {`$5.99`}
                  </span>
                }
                <span className="title_md tracking-[.6px] text-primary-700 ">
                  {"FREE"}
                </span>
              </div>
            </div>
          </div>
          <Checkout />
        </div>
      </div>
    );
};

export default Review;
