import type { TProduct } from "@/models/product/index"

type TInputVariant = {
  name: Partial<keyof TProduct>;
  type: string;
  placeholder: string;
  label: string;
}

export const inputsData: TInputVariant[] = [
  {
    name: 'productName',
    type: 'text',
    placeholder: 'Type product name',
    label: 'Product Name'
  },
  {
    name: 'count',
    type: 'number',
    placeholder: 'Count',
    label: 'Count'
  },
  {
    name: 'price',
    type: 'number',
    placeholder: 'Price',
    label: 'Price'
  },
]