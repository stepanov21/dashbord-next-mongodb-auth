"use client";

import Card from "@/components/Card/Card";
import { LineChart } from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import { selectOption } from "@/components/FormControls/selectOption";
import { TProduct } from "@/models/product/index";
import { GET_ALL_PRODUCTS } from "@/react-query/product/product";
import { getNumbersByMonth } from "@/utils/getNumbersByMonth";
import { useQuery } from "react-query";

const Home = () => {
  const { isLoading, error, data } = useQuery("repoData", GET_ALL_PRODUCTS);

  console.log(data?.data);

  getNumbersByMonth();

  const getAccumFromCategory = (
    data: TProduct[],
    filter: string | null = null
  ) => {
    if (filter) {
      const category = data.filter((item) =>
        item.category === filter ? item : null
      );
      return category.reduce((a, i) => a + i.price, 0);
    }
    return data.reduce((a, i) => a + i.price, 0);
  };

  if (isLoading) return null;

  return (
    <>
      {/* <div className="grid grid-cols-4 gap-6">
        {!isLoading &&
          selectOption.map((option) => (
            <Card
              filter={option}
              sum={getAccumFromCategory(data?.data, option)}
            />
          ))}
      </div> */}
      <Card filter="Итого" sum={getAccumFromCategory(data?.data)} />
      <PieChart />
      <LineChart />
    </>
  );
};

export default Home;
