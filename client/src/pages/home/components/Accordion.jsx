import { useState } from "react";
import Card from "../../../components/ui/Card";
import AccordionHeader from "./AccordionHeader";
import Button from "../../../components/ui/Button";
import Package from "./Package";
import { useCart } from "../../../providers/CartProvider";

const Accordion = ({
  items = [],
  defaultActiveIndex = null,

  inactiveClassName = "",
}) => {
  const { getSelectedProductsCount } = useCart();
  const [activeIndexes, setActiveIndexes] = useState(defaultActiveIndex);

  const handleToggle = (index) => {
    setActiveIndexes((prev) => (prev === index ? null : index));
  };

  const isOpen = (index) => activeIndexes === index;
  const steps = items?.length;
  return (
    <div className={`w-full flex flex-col gap-[13px] flex-1`}>
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
              steps={steps}
              selected={getSelectedProductsCount(item?.id)}
            />
          </div>

          {isOpen(index) && (
            <div className=" pb-5">
              <>
                {item?.type === "product" && (
                  <div className="px-[15px] pb-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-[15px]">
                    {item?.data?.map((p, index) => (
                      <div
                        key={p.id}
                        className={
                          item.data.length % 2 === 1 &&
                          index === item.data.length - 1
                            ? "xl:col-span-2 xl:flex xl:justify-center"
                            : "h-fit"
                        }
                      >
                        <Card data={p} categoryId={item?.id} />
                      </div>
                    ))}
                  </div>
                )}
                {item?.type === "plan" && (
                  <div className="px-[15px] pb-5 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-[15px]">
                    {item?.data?.map((p, index) => (
                      <div key={p.id}>
                        <Package data={p} />
                      </div>
                    ))}
                  </div>
                )}
              </>
              {index !== steps - 1 && (
                <Button
                  variant="secondary"
                  className="mx-auto"
                  text={`Next: ${items?.[index + 1]?.subTitle}`}
                  size="md"
                  handleClick={() => setActiveIndexes(index + 1)}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
