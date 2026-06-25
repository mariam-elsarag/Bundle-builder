import React, { useState } from "react";
import AccordionHeader from "./AccordionHeader";
import Card from "../../../components/ui/Card";

const Accordion = ({
  items = [],
  defaultActiveIndex = null,
  multiple = false,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
}) => {
  const [activeIndexes, setActiveIndexes] = useState(defaultActiveIndex);

  const handleToggle = (index) => {
    setActiveIndexes((prev) => (prev === index ? null : index));
  };

  const isOpen = (index) => activeIndexes === index;
  console.log(items, "s");
  return (
    <div className={`flex flex-col gap-[13px] flex-1`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={` rounded-[10px]  ${isOpen(index) ? `bg-primary-50 pt-[15px]` : inactiveClassName}`}
        >
          <div type="button" onClick={() => handleToggle(index)}>
            <AccordionHeader
              item={item}
              isOpen={isOpen}
              index={index}
              steps={items?.length}
            />
          </div>

          {isOpen(index) && (
            <div className="px-[15px] pb-5 grid sm:grid-cols-2 gap-[15px]">
              {item?.products?.map((p, index) => (
                <div
                  key={p.id}
                  className={
                    item.products.length % 2 === 1 &&
                    index === item.products.length - 1
                      ? "sm:col-span-2 flex justify-center"
                      : ""
                  }
                >
                  <Card data={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
