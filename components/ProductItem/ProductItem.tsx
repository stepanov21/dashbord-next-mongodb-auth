import { TProduct } from "@/models/product/index";
import { FC } from "react";

const ProductItem: FC<TProduct> = ({ category, count, price, productName }) => {
  return (
    <div className="w-full grid grid-cols-4 bg-gray rounded-xl px-5 py-4 mt-4">
      <span>{productName}</span>
      <span className="text-center">{count}</span>
      <span className="text-center">{price}</span>
      <span className="text-center">{category}</span>
    </div>
  );
};

export default ProductItem;
