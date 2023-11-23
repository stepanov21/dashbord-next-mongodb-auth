import { FC, InputHTMLAttributes, memo } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<IInput> = ({ label, ...props }) => {
  return (
    <div className="sm:col-span-2 w-full">
      <label
        htmlFor={props.name}
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...props}
        className="bg-milk border border-black py-3 pl-3 pr-5 rounded-md focus:none focus-visible:none focus:milk w-full placeholder:text-[black] placeholder:opacity-50 focus:outline-none"
      />
    </div>
  );
};

export default memo(Input);
