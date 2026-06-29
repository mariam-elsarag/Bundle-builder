import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import { SatisfactionBadgeImg } from "../../../assets/images/Image";
import { useCart } from "../../../providers/CartProvider";
import axiosInstance from "../../../services/axiosInstance";
import { API } from "../../../services/api";
import Spinner from "../../../components/feedback/Spinner";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    totalSavings,
    totalPrice,
    totalBeforeDiscount,
    handleSaveCart,
    loadingSaveBtn,
  } = useCart();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <figure className="flex items-center justify-between gap-4">
          <img
            src={SatisfactionBadgeImg}
            alt=""
            aria-hidden={true}
            className="size-[78px]"
          />
          <div className="flex flex-col gap-2 items-end">
            <span className="body_sm text-white  bg-primary-700 w-fit flex items-center  j h-[18px]  px-2 rounded-[3px]">
              as low as $19.19/mo
            </span>
            <div className="flex justify-end items-center gap-2">
              <span className={`text-[#6F7882] body_md`}>
                {`$${totalBeforeDiscount.toFixed(2)}`}
              </span>
              <span className="label_xl_bold text-primary-700">
                {`$${totalPrice.toFixed(2)}`}
              </span>
            </div>
          </div>
        </figure>
        <div className="flex flex-col gap-1 ">
          <p className="title_sm pt-2.5 text-tertiary-500 text-center -tracking-[.06px]">{`Congrats! You’re saving $${totalSavings} on your security bundle!`}</p>
          <Button
            handleClick={handleCheckout}
            text="Checkout"
            className="w-full"
          />
        </div>
      </div>
      <button
        disabled={loadingSaveBtn}
        onClick={handleSaveCart}
        className={`flex items-center justify-center gap-2 cursor-pointer label_md_italic text-neutral-700 ${loadingSaveBtn ? "opacity-50" : ""} -tracking-[.2px] underline text-center`}
      >
        {loadingSaveBtn && <Spinner size="sm" />}
        Save my system for later
      </button>
    </div>
  );
};

export default Checkout;
