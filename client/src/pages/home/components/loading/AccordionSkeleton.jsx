const AccordionSkeleton = ({ itemsCount = 4 }) => {
  return (
    <div className="w-full flex flex-col gap-[13px] flex-1 animate-pulse">
      {Array.from({ length: itemsCount }).map((_, index) => {
        const isOpen = index === 0;

        return (
          <div
            key={index}
            className={`rounded-[10px] overflow-hidden bg-neutral-100`}
          >
            <div className="px-[15px] pt-[15px]">
              <div className="h-3 w-28 bg-neutral-200 rounded mb-2" />

              <div className="h-[1px] w-full bg-neutral-200 mb-3" />

              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <div className="size-[20px] bg-neutral-200 rounded" />
                  <div className="h-4 w-32 bg-neutral-200 rounded" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-16 bg-neutral-200 rounded" />
                  <div className="size-3 bg-neutral-200 rounded" />
                </div>
              </div>

              <div className="h-[1px] w-full bg-neutral-200" />
            </div>

            {isOpen && (
              <div className="px-[15px] pb-5 pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-[15px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[220px] bg-neutral-200 rounded-[10px]"
                  />
                ))}
              </div>
            )}

            {isOpen && (
              <div className="pb-5 flex justify-center">
                <div className="h-10 w-40 bg-neutral-200 rounded-[8px]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionSkeleton;
