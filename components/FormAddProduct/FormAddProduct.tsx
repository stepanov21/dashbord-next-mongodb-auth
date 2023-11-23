"use client";

import { TProduct } from "@/models/product/index";
import { Button } from "@/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  EventHandler,
  FormEvent,
  memo,
  MouseEventHandler,
  useState,
} from "react";
import Input from "../FormControls/Input";
import Select from "../FormControls/Select";
import FormHeader from "./FormHeader";
import { inputsData } from "./inputsData";
import { useMutation } from "react-query";
import { queryClient } from "@/provider/QueryProvider";
import { ADD_PRODUCT } from "@/react-query/product/product";

const FormAddProduct = () => {
  const { data: userData } = useSession();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState<TProduct>({
    productName: "",
    count: 1,
    price: null,
    category: "",
    email: "",
  });

  const addProduct = useMutation(ADD_PRODUCT, {
    onSuccess: () => queryClient.refetchQueries(["dataByDay"]),
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
      <div className="flex justify-between items-center">
        <h2>My spending today:</h2>
        <Button
          className="bg-yellow px-[30px]"
          onClick={() => setIsOpenModal(true)}>
          Add new
        </Button>
      </div>
      {isOpenModal && (
        <form
          data-close="true"
          onClick={(e) => closeModalOutside(e as any)}
          onSubmit={(e) => addNewProduct(e)}
          className="absolute inset-0 bg-[black] bg-opacity-50 flex items-center justify-center p-3 z-10">
          <div className="bg-milk w-full max-w-[350px] rounded-2xl px-4 py-4 flex flex-col gap-3 btn-shadow">
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
};

export default memo(FormAddProduct);
