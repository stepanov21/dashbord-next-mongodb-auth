import { FC, InputHTMLAttributes, memo } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<IInput> = ({ label, ...props }) => {
  return (
    <div className="sm:col-span-2 w-full">
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...props}
        className="bg-black border border-green py-3 pl-3 pr-5 rounded-md  focus:outline-green focus-visible:outline-green focus:border-green w-full"
      />
    </div>
  );
};

export default memo(Input);
