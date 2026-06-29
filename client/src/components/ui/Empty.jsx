import React from "react";
import { EmptyIcon } from "../../assets/Icon";

const Empty = ({
  title = "No Data Found",
  description = "There is nothing to display at the moment.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh py-16 px-6 text-center">
      <EmptyIcon fill="var(--color-neutral-950)" />

      <h3 className="title_xl  text-neutral-950">{title}</h3>

      <p className="mt-2 max-w-sm body_lg text-neutral-700/75">{description}</p>
    </div>
  );
};

export default Empty;
