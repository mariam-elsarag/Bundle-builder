import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const CheckoutSuccess = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border border-neutral-200 bg-white py-6 px-4 sm:p-8 text-center shadow-sm">
        <div className="mx-auto mb-3 sm:mb-6 flex size-16 sm:size-20 items-center justify-center rounded-full bg-tertiary-400/15">
          <svg
            className=" size-8 sm:size-10 text-tertiary-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="title_2xl  text-neutral-950">Order Submitted!</h1>

        <p className="mt-3 body_lg leading-6! md:leading-7! text-neutral-950/50">
          Thank you for your order. We've received your request and our team
          will review it shortly. We'll contact you with the next steps as soon
          as possible.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button to="/" text="Back to Home" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
