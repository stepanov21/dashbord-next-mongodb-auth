"use client";

import { TProduct } from "@/models/product/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FC } from "react";
import { LuDelete } from "react-icons/lu";

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
  return (
    <div className="w-full grid grid-cols-[1.5fr_1fr_1fr_2fr_min-content] gap-1 bg-gray rounded-xl px-5 py-4 mt-4 aria-disabled:opacity-40">
      <span>{productName}</span>
      <span className="text-center">{count}</span>
      <span className="text-center">
        {price} <span className="text-green">₴</span>
      </span>
      <span className="text-center whitespace-nowrap overflow-hidden overflow-ellipsis">
        {category}
      </span>
      <span
        className="flex justify-end"
        onClick={() => deleteProductById(_id!)}>
        <LuDelete size={25} />
      </span>
    </div>
  );
};

export default ProductItem;
