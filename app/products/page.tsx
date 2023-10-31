"use client";

import FormAddProduct from "@/components/FormAddProduct/FormAddProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { queryClient } from "@/provider/QueryProvider";
import {
  DELETE_PRODUCT_BY_ID,
  GET_ALL_PRODUCTS,
} from "@/react-query/product/product";
import { useQuery, useMutation } from "react-query";

const ProductPage = () => {
  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    GET_ALL_PRODUCTS,
    {
      onSuccess: () => console.log("Продукты финиш !"),
    }
  );

  const deleteProductById = useMutation(DELETE_PRODUCT_BY_ID, {
    onSuccess: () => queryClient.refetchQueries(["repoData"]),
  });

  return (
    <div className="">
      <FormAddProduct />
      {data &&
        data?.data.map((product, key) => {
          return (
            <ProductItem
              key={key}
              {...product}
              _id={product._id}
              deleteProductById={deleteProductById.mutate}
            />
          );
        })}
    </div>
  );
};

export default ProductPage;
