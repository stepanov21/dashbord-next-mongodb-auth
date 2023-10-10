"use client";

import { TProduct } from "@/models/product/index";
import { selectOption } from "@/components/FormControls/selectOption";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<TProduct[]>([]);

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
    getAllMyProducts().then((res) => setData(res));
    console.log(
      "🚀 ~ file: page.tsx:28 ~ getAccumFromCategory ~ getAccumFromCategory:",
      getAccumFromCategory(data, "Продукты")
    );
  }, []);

  const getAccumFromCategory = (data: TProduct[], filter: string) => {
    const category = data.filter((item) =>
      item.category === filter ? item : null
    );
    return category.reduce((a, i) => a + i.price, 0);
  };

  return <div></div>;
};

export default Home;
