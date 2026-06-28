import React from "react";
import { ArrowImg } from "../../../assets/images/Image";

const AccordionHeader = ({ item, index, steps, isOpen, selected }) => {
  return (
    <header className=" flex-1 flex flex-col gap-[5px]">
      {/* step */}
      <p className="px-[15px] body_sm tracking-[1.6px] uppercase text-neutral-700">{`Step ${index + 1} of ${steps}`}</p>
      <div>
        <div className="h-[.5px] w-full bg-neutral-950" />
        {/* header */}
        <div
          className={`flex items-center justify-between gap-2  px-[15px] ${isOpen(index) ? "pt-5 pb-[15px]" : "py-4 sm:py-[17px]"}`}
        >
          <div className="flex items-center gap-2  ">
            <img
              src={item?.icon}
              alt={`${item?.title}-icon`}
              className=" w-[20px] sm:w-[26px]"
            />
            <h2 className="title_2xl">{item?.subTitle}</h2>
          </div>
          {/* arrow & no of selected items */}
          <div className="flex items-center gap-1">
            {selected > 0 && (
              <span
                className={`body_md text-primary-700 ${isOpen(index) ? "sm:flex" : "sm:hidden"} `}
              >{`${selected} selected`}</span>
            )}
            <button type="button">
              <img
                src={ArrowImg}
                className={`size-3 ${isOpen(index) ? "" : "rotate-180"}`}
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        {/* divider */}
        <div
          className={`h-[.5px] w-full bg-neutral-950 ${isOpen(index) ? "hidden" : "block"} `}
        />
      </div>
    </header>
  );
};

export default AccordionHeader;
