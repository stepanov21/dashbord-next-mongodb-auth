"use client";

import Card from "@/components/Card/Card";
import { LineChart } from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import { TProduct } from "@/models/product/index";
import { GET_ALL_PRODUCTS } from "@/react-query/product/product";
import { Button } from "@/ui/Button";
import { getNumbersByMonth } from "@/utils/getNumbersByMonth";
import { useQuery } from "react-query";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import { selectOption } from "@/components/FormControls/selectOption";

const Home = () => {
  const [weekAgo, setWeekAgo] = useState(0);

  const { isLoading, error, data, refetch } = useQuery(["repoData"], () =>
    GET_ALL_PRODUCTS(weekAgo)
  );

  useEffect(() => {
    refetch();
  }, [weekAgo]);

  const getAccumFromCategory = useCallback(
    (data: TProduct[], filter: string | null = null) => {
      if (filter) {
        const category = data.filter((item) =>
          item.category === filter ? item : null
        );
        return category.reduce((a, i) => a + i.price, 0);
      }
      return data.reduce((a, i) => a + i.price, 0);
    },
    [data]
  );

  if (error) return <div>Server die</div>;
  if (isLoading) return null;

  return (
    <>
      <div
        className="flex justify-between gap-4 aria-disabled:opacity-40"
        aria-disabled={isLoading}>
        <Button
          aria-disabled={weekAgo >= 4 || isLoading}
          disabled={weekAgo >= 4 || isLoading}
          onClick={() => {
            setWeekAgo((prev) => prev + 1);
          }}
          className="bg-green px-2 py-4 aria-disabled:opacity-40">
          <BiLeftArrowAlt />
        </Button>
        <div className="btn-shadow rounded-main flex-1 flex items-center px-4 justify-between">
          <h2>Current week:</h2>
          <span>{getAccumFromCategory(data?.data)}₴</span>
        </div>
        <Button
          aria-disabled={weekAgo <= 0 || isLoading}
          disabled={weekAgo <= 0 || isLoading}
          onClick={() => {
            setWeekAgo((prev) => prev - 1);
          }}
          className="bg-green px-2 py-4 aria-disabled:opacity-40">
          <BiRightArrowAlt />
        </Button>
      </div>
      {/* <Card filter="Итого" sum={getAccumFromCategory(data?.data)} /> */}
      <PieChart isLoading={isLoading} data={data} />
      <LineChart />
    </>
  );
};

export default Home;
