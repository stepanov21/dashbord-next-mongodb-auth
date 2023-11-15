import { FC, InputHTMLAttributes } from "react";
import { BiSearch } from "react-icons/bi";

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {}

const ProductSearch: FC<ISearch> = ({ ...props }) => {
  return (
    <div className="p-4 border border-[black] rounded-main flex items-center gap-3">
      <span>
        <BiSearch size={18} />
      </span>
      <input
        {...props}
        className="w-full h-full outline-none border-none bg-milk"
        type="text"
      />
    </div>
  );
};

export default ProductSearch;
