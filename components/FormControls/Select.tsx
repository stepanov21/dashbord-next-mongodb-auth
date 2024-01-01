import { FC, SelectHTMLAttributes } from "react";
import { selectOption } from "./selectOption";

const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ ...props }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="category"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white w-full">
        Category
      </label>
      <select
        {...props}
        id="category"
        name="category"
        className="border block border-[black] bg-milk dark:bg-gray p-3 rounded-md w-full focus:outline-none">
        <option value="TV">Select Category</option>
        {selectOption.map((option, key) => {
          return (
            <option key={key} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
