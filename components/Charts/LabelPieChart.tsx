import { cn } from "@/utils/cn";
import React from "react";

const LabelPieChart = ({ color, name }) => {
  return (
    <li className="flex gap-2 items-center p-2 border border-[#000] dark:bg-gray rounded-main ">
      <span
        className={cn(
          `min-h-[10px] min-w-[10px] inline-block rounded-full border border-[#000]
      `,
          `bg-[${color}]`
        )}></span>
      {name}
    </li>
  );
};

export default LabelPieChart;
