import { FC, SelectHTMLAttributes } from "react";
import { selectOption } from "./selectOption";

const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ ...props }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="category"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full">
        Category
      </label>
      <select
        {...props}
        id="category"
        name="category"
        className="border block border-green bg-black p-3 rounded-md w-full">
        <option value="TV">Select Category</option>
        {selectOption.map((option) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
