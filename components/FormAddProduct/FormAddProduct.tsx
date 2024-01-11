"use client";

import { useSession } from "next-auth/react";
import { memo, useState } from "react";
import { useMutation } from "react-query";

import type { TProduct } from "@/models/product/index";
import { queryClient } from "@/provider/QueryProvider";
import { ADD_PRODUCT } from "@/react-query/product/product";
import { Button } from "@/ui/Button";

import Input from "../FormControls/Input";
import Select from "../FormControls/Select";

import { inputsData } from "./inputsData";

import type { FormEvent } from "react";

const FormAddProduct = () => {
  const { data: userData } = useSession();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [validError, setValidError] = useState("");
  const [formData, setFormData] = useState<TProduct>({
    productName: "",
    count: 1,
    price: 0,
    category: "",
    email: "main",
  });

  const addProduct = useMutation(ADD_PRODUCT, {
    onSuccess: () => queryClient.refetchQueries(["dataByDay"]),
  });

  const addNewProduct = (e: FormEvent) => {
    e.preventDefault();
    for (const i in formData) {
      if (!formData[i]) {
        setValidError(`Field ${i} must be filled`);
        return;
      } else {
        setValidError("");
      }
    }

    console.log(validError, formData);

    addProduct.mutate({ formData, email: userData?.user?.email });
    setIsOpenModal(false);
  };

  const closeModalOutside = (e: { target: HTMLFormElement }) => {
    e?.target?.localName === "form" && setIsOpenModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>My spending today:</h2>
        <Button
          className="bg-yellow px-[30px]"
          onClick={() => setIsOpenModal(true)}
        >
          Add new
        </Button>
      </div>
      {isOpenModal && (
        <form
          data-close="true"
          onClick={(e) => closeModalOutside(e as any)}
          onSubmit={(e) => addNewProduct(e)}
          className="absolute inset-0 bg-[black] bg-opacity-50 flex items-center justify-center p-3 z-10"
        >
          <div className="relative bg-milk dark:bg-gray w-full max-w-[350px] rounded-main px-4 py-4 flex flex-col gap-3 btn-shadow">
            {inputsData &&
              inputsData.length &&
              inputsData.map((input, key) => {
                return (
                  <Input
                    key={key}
                    value={formData[input.name]}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [input.name]:
                          input.type === "number"
                            ? parseInt(e.target.value)
                            : e.target.value,
                      }));
                    }}
                    {...input}
                  />
                );
              })}
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            />
            <Button type="submit" className="w-full mt-2">
              Add New Product
            </Button>
            {validError && (
              <div className="absolute bg-red-300 px-4 py-2 btn-shadow bottom-[-30px] left-[50%] translate-x-[-50%] whitespace-nowrap">
                {validError}
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default memo(FormAddProduct);
