"use client";

import { TProduct } from "@/models/product/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FC } from "react";
import { LuDelete } from "react-icons/lu";

const ProductItem: FC<TProduct> = ({
  category,
  count,
  price,
  productName,
  _id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function deleteProductById(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:3000/api/product/delete-product",
        {
          method: "POST",
          body: JSON.stringify({ _id: id }),
        }
      );

      const { data } = await res.json();

      router.refresh();

      return data;
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:18 ~ getAllProducts ~ error:", error);
    }
  }
  return (
    <div
      className="w-full grid grid-cols-[1.5fr_1fr_1fr_2fr_min-content] gap-1 bg-gray rounded-xl px-5 py-4 mt-4 aria-disabled:opacity-40"
      aria-disabled={isLoading}>
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
