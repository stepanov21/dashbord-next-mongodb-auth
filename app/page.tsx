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
  }, []);

  const getAccumFromCategory = (data: TProduct[], filter: string) => {
    const category = data.filter((item) =>
      item.category === filter ? item : null
    );
    return category.reduce((a, i) => a + i.price, 0);
  };

  console.log(
    "🚀 ~ file: page.tsx:28 ~ getAccumFromCategory ~ getAccumFromCategory:",
    getAccumFromCategory(data, "Продукты")
  );

  const state = {
    options: {
      chart: {
        id: "bar",
      },
      xaxis: {
        categories: [...selectOption],
      },
    },
    series: [
      {
        name: "series-1",
        data: selectOption.map((item, i) =>
          getAccumFromCategory(data, selectOption[i])
        ),
      },
    ],
  };
  return <div></div>;
};

export default Home;
