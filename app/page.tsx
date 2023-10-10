import { selectOption } from "@/components/FormControls/selectOption";
import { headers } from "next/headers";
import { TProduct } from "@/models/product/index";
import Card from "@/components/Card/Card";

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

const getAccumFromCategory = (data: TProduct[], filter: string) => {
  const category = data.filter((item) =>
    item.category === filter ? item : null
  );
  return category.reduce((a, i) => a + i.price, 0);
};

export default async function Home() {
  const data = await getAllMyProducts();

  const sum = getAccumFromCategory(data, "Продукты");

  console.log(
    "🚀 ~ file: page.tsx:28 ~ getAccumFromCategory ~ getAccumFromCategory:",
    getAccumFromCategory(data, "Продукты")
  );
  return (
    <div>
      <Card filter="Продукты" sum={sum} />
    </div>
  );
}
