import FormAddProduct from "@/components/FormAddProduct/FormAddProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { TProduct } from "@/models/product/index";
import { headers } from "next/headers";

async function getAllProducts() {
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

export default async function ProductPage() {
  const products: TProduct[] = await getAllProducts();
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
}
