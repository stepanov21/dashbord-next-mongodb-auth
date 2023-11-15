"use client";

import { TProduct } from "@/models/product/index";
import { FC } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { selectOption } from "../FormControls/selectOption";

interface IProductItem extends TProduct {
  deleteProductById: (id: string) => void;
}

const ProductItem: FC<IProductItem> = ({
  category,
  count,
  price,
  productName,
  _id,
  deleteProductById,
}) => {
  const colorCategory = selectOption.find((item) => item.name === category);

  return (
    <div className="w-full grid grid-cols-[1.5fr_1fr_1fr_2fr_min-content] gap-1 bg-black rounded-main p-3 mt-2 border border-[#181818] items-center aria-disabled:opacity-40 first:mt-0">
      <span>{productName}</span>
      <span className="text-center">{count}</span>
      <span className="text-center">
        {price} <span className="">₴</span>
      </span>
      <div
        className={`h-3 w-3 border border-[black] mx-auto rounded-full bg-[${colorCategory.color}]`}></div>
      <span
        className="flex justify-end"
        onClick={() => deleteProductById(_id!)}>
        <BiTrashAlt size={18} />
      </span>
    </div>
  );
};

export default ProductItem;
