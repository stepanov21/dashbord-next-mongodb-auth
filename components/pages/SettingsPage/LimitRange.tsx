import React from "react";

const LimitRange = () => {
  return (
    <div>
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Default range
      </label>
      <input
        id="default-range"
        type="range"
        min={"200"}
        max={"2000"}
        step={"100"}
        className="w-full h-2 border border-[black] rounded-main cursor-pointer appearance-none bg-milk in-range:bg-green in-range:border out-of-range:bg-green after:bg-green"
      />
      <div
        className="flex justify-between mt-2
      ">
        <span>200</span>
        <span>2000</span>
      </div>
    </div>
  );
};

export default LimitRange;
