import { TProduct } from "@/models/product";

export const getAccumFromCategory = (
  data: TProduct[],
  filter: { name: string; color: string },
) => {
  const category = data.filter((item) => {
    if (item.category === filter.name) {
      return item;
    } else {
      return null;
    }
  });

  return {
    name: filter.name,
    sum: category.reduce((a, i) => a + i.price * i.count, 0),
    color: filter.color,
  };
};
