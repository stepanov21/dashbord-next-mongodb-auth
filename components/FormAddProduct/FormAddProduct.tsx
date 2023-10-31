"use client";

import { TProduct } from "@/models/product/index";
import { Button } from "@/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EventHandler, FormEvent, MouseEventHandler, useState } from "react";
import Input from "../FormControls/Input";
import Select from "../FormControls/Select";
import FormHeader from "./FormHeader";
import { inputsData } from "./inputsData";
import { useMutation } from "react-query";
import { queryClient } from "@/provider/QueryProvider";
import { ADD_PRODUCT } from "@/react-query/product/product";

export default function FormAddProduct() {
  const { data: userData } = useSession();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState<TProduct>({
    productName: "",
    count: 0,
    price: 0,
    category: "",
    email: "",
  });

  const addProduct = useMutation(ADD_PRODUCT, {
    onSuccess: () => queryClient.refetchQueries(["repoData"]),
  });

  const addNewProduct = async (e: FormEvent) => {
    e.preventDefault();
    addProduct.mutate({ formData, email: userData?.user?.email });
    setIsOpenModal(false);
  };

  const closeModalOutside = (e: { target: HTMLFormElement }) => {
    e?.target?.localName === "form" && setIsOpenModal(false);
  };

  console.log(formData);

  return (
    <>
      <Button onClick={() => setIsOpenModal(true)}>Add new product</Button>
      <FormHeader />
      {isOpenModal && (
        <form
          data-close="true"
          onClick={(e) => closeModalOutside(e as any)}
          onSubmit={(e) => addNewProduct(e)}
          className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray w-full max-w-[350px] rounded-2xl px-4 py-6 flex flex-col gap-4">
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
          </div>
        </form>
      )}
    </>
  );
}
