"use client";

import FormAddProduct from "@/components/FormAddProduct/FormAddProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { TProduct } from "@/models/product/index";
import { useEffect } from "react";
import { useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function getAllMyProducts() {
      try {
        const res = await fetch(`/api/product/get-all-product`, {
          method: "GET",
          cache: "no-store",
        });
        const { data } = await res.json();

        return data;
      } catch (error) {
        console.log("🚀 ~ file: page.tsx:18 ~ getAllProducts ~ error:", error);
      }
    }
    getAllMyProducts().then((res) => setProducts(res));
  }, []);

  console.log(products);

  return (
    <div className="">
      <FormAddProduct />
      {products &&
        products.map((product, key) => {
          return <ProductItem key={key} {...product} _id={product._id} />;
        })}
    </div>
  );
};

export default ProductPage;
