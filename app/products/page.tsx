"use client";

import FormAddProduct from "@/components/FormAddProduct/FormAddProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { TProduct } from "@/models/product/index";
import { headers } from "next/headers";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [data, setData] = useState<TProduct[]>([]);

  useEffect(() => {
    async function getAllMyProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/product/get-all-product`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        const { data } = await res.json();

        return data;
      } catch (error) {
        console.log("🚀 ~ file: page.tsx:18 ~ getAllProducts ~ error:", error);
      }
    }
    getAllMyProducts().then((res) => setData(res));
  }, []);
  return (
    <div className="">
      <FormAddProduct />
      {data &&
        data.map((product, key) => {
          return <ProductItem key={key} {...product} _id={product._id} />;
        })}
    </div>
  );
};

export default ProductPage;
