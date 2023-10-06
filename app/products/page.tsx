"use client";

import FormAddProduct from "@/components/FormAddProduct/FormAddProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { TProduct } from "@/models/product/index";
import React, { useEffect, useState } from "react";

export default async function ProductsPage() {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await fetch(`/api/product/get-all-product`, {
          method: "GET",
          cache: "no-store",
        });

        const { data } = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("🚀 ~ file: page.tsx:18 ~ getAllProducts ~ error:", error);
      }
    }
    getAllProducts();
  }, []);

  return (
    <div className="p-6">
      <FormAddProduct />
      {products &&
        products.map((product, key) => {
          return <ProductItem key={key} {...product} />;
        })}
    </div>
  );
}
