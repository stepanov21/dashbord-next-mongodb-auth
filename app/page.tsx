import { selectOption } from "@/components/FormControls/selectOption";
import { headers } from "next/headers";
import { TProduct } from "@/models/product/index";

export const dynamic = "force-dynamic";

async function getAllMyProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/product/get-all-product`,
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
        id: "basic-bar",
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
}
