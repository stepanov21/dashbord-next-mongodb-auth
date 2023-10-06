import FormAddProduct from "@/components/FormAddProduct/FormAddProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { TProduct } from "@/models/product/index";
import React from "react";

async function getAllProducts() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/product/get-all-product",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("🚀 ~ file: page.tsx:18 ~ getAllProducts ~ error:", error);
  }
}

export default async function ProductsPage() {
  const { data: allProduct }: { data: TProduct[] } = await getAllProducts();

  return (
    <div className="p-6">
      <FormAddProduct />
      {allProduct &&
        allProduct.map((product, key) => {
          return <ProductItem key={key} {...product} />;
        })}
    </div>
  );
}
