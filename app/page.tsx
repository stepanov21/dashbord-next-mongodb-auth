import Charts from "@/components/Charts/Charts";
import { selectOption } from "@/components/FormControls/selectOption";
import { headers } from "next/headers";
import getDate from "date-fns/getDate";

async function getAllMyProducts() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/product/get-all-product`,
      {
        method: "GET",
        cache: "no-store",
        headers: headers(),
      }
    );
    const { data } = await res.json();

    return data;
  } catch (error) {
    console.log("🚀 ~ file: page.tsx:18 ~ getAllProducts ~ error:", error);
  }
}

export default async function Home() {
  const data = await getAllMyProducts();
  const days = [...data.map((item) => getDate(new Date(item.createdAt)))];
  const currentDays = Array.from(new Set(days));

  const accum = data.reduce((acc, item) => acc + item.price, 0);
  console.log("🚀 ~ file: page.tsx:30 ~ Home ~ accum:", accum);

  console.log("🚀 ~ file: page.tsx:24 ~ Home ~ data:", data);

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: currentDays,
      },
    },
    series: [
      {
        name: "series-1",
        data: [accum],
      },
    ],
  };
  return <Charts {...state} />;
}
