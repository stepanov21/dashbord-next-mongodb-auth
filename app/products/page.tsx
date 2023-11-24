"use client";

import FormAddProduct from "@/components/FormAddProduct/FormAddProduct";
import FormHeader from "@/components/FormAddProduct/FormHeader";
import ProductSearch from "@/components/pages/Products/ProductSearch";
import ProductItem from "@/components/ProductItem/ProductItem";
import { queryClient } from "@/provider/QueryProvider";
import {
  DELETE_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_DAY,
} from "@/react-query/product/product";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";

const ProductPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, error, data, refetch } = useQuery(
    "dataByDay",
    () => GET_PRODUCTS_BY_DAY(),
    {
      onSuccess: () => console.log("Продукты финиш !"),
    }
  );

  const deleteProductById = useMutation(DELETE_PRODUCT_BY_ID, {
    onSuccess: () => queryClient.refetchQueries(["dataByDay"]),
  });

  return (
    <div className="">
      <FormAddProduct />
      <div className="btn-shadow bg-milk border-b-none p-3 rounded-main mt-4 rounded-b-none">
        <ProductSearch
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="btn-shadow border-t-none bg-milk p-3 rounded-main rounded-t-none relative top-[-1px]">
        {data?.data.length ? (
          <FormHeader />
        ) : (
          <div className="opacity-40 text-center py-4">
            You have not added anything yet
          </div>
        )}
        {data?.data &&
          data?.data
            .filter((item) => item?.productName.includes(searchValue))
            .map((product, key) => {
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
    </div>
  );
};

export default ProductPage;
