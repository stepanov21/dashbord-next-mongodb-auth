import { memo } from "react";

import type { FC, InputHTMLAttributes} from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<IInput> = ({ label, ...props }) => {
  return (
    <div className="sm:col-span-2 w-full">
      <label
        htmlFor={props.name}
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">
        {label}
      </label>
      <input
        {...props}
        className="bg-milk border border-black dark:bg-gray py-3 pl-3 pr-5 rounded-md focus:none focus-visible:none focus:milk w-full placeholder:text-[black] dark:placeholder:text-white placeholder:opacity-50 focus:outline-none "
        placeholder="New username..."
      />
    </div>
  );
};

export default memo(Input);
