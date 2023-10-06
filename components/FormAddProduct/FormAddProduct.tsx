"use client";

import { TProduct } from "@/models/product/index";
import { Button } from "@/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EventHandler, MouseEventHandler, useState } from "react";
import Input from "../FormControls/Input";
import Select from "../FormControls/Select";
import { inputsData } from "./inputsData";

export default function FormAddProduct() {
  const { data: userData } = useSession();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState<TProduct>({
    productName: "",
    count: 0,
    price: 0,
    category: "",
  });
  const router = useRouter();

  const addNewProduct = async () => {
    console.log("Добавить");
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/product/add-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, email: userData?.user?.email! }),
        }
      );

      const data = await res.json();
      console.log(
        "🚀 ~ file: FormAddProduct.tsx:24 ~ addNewProduct ~ data:",
        data
      );
      setIsOpenModal(false);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const closeModalOutside = (e: { target: HTMLFormElement }) => {
    e?.target?.localName === "form" && setIsOpenModal(false);
  };

  console.log(formData);

  return (
    <>
      <Button onClick={() => setIsOpenModal(true)}>Add new product</Button>
      {isOpenModal && (
        <form
          data-close="true"
          onClick={(e) => closeModalOutside(e as any)}
          onSubmit={() => addNewProduct()}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray w-[35vw] rounded-2xl px-4 py-6 flex flex-col gap-4">
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
            <Select />
            <Button type="submit" className="w-full mt-2">
              Add New Product
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
