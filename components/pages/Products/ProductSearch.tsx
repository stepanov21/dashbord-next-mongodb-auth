import { BiSearch } from "react-icons/bi";

import type { FC, InputHTMLAttributes } from "react";

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {}

const ProductSearch: FC<ISearch> = ({ ...props }) => {
  return (
    <div className="p-4 border  border-[black] rounded-main flex items-center gap-3">
      <span>
        <BiSearch size={18} />
      </span>
      <input
        {...props}
        className="w-full h-full outline-none border-none bg-milk dark:bg-gray"
        type="text"
      />
    </div>
  );
};

export default ProductSearch;
