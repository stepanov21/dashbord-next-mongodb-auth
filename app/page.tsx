"use client";

import { useCallback, useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useQuery } from "react-query";

import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import type { TProduct } from "@/models/product/index";
import { GET_PRODUCTS_BY_WEEK } from "@/react-query/product/product";
import { Button } from "@/ui/Button";

const Home = () => {
  const [weekAgo, setWeekAgo] = useState(0);

  const { isLoading, error, data, refetch } = useQuery(["repoData"], () =>
    GET_PRODUCTS_BY_WEEK(weekAgo),
  );

  useEffect(() => {
    refetch();
  }, [weekAgo]);

  const getAccumFromCategory = useCallback(
    (data: TProduct[], filter: string | null = null) => {
      if (filter) {
        const category = data.filter((item) =>
          item.category === filter ? item : null,
        );
        return category.reduce((a, i) => a + i.price * i.count, 0);
      }
      return data.reduce((a, i) => a + i.price * i.count, 0);
    },
    [data],
  );

  if (error) return <div>Server die</div>;
  if (!data) return null;

  return (
    <>
      <div
        className="flex justify-between gap-4 aria-disabled:opacity-40"
        aria-disabled={isLoading}
      >
        <Button
          aria-disabled={weekAgo >= 4 || isLoading}
          disabled={weekAgo >= 4 || isLoading}
          onClick={() => {
            setWeekAgo((prev) => prev + 1);
          }}
          className="bg-green px-2 py-4 aria-disabled:opacity-40"
        >
          <BiLeftArrowAlt />
        </Button>
        <div className="btn-shadow rounded-main flex-1 flex items-center px-4 justify-between  dark:bg-gray">
          <h2>{weekAgo ? `${weekAgo} weeks ago:` : "Current week:"}</h2>
          <span>{getAccumFromCategory(data?.data)}₴</span>
        </div>
        <Button
          aria-disabled={weekAgo <= 0 || isLoading}
          disabled={weekAgo <= 0 || isLoading}
          onClick={() => {
            setWeekAgo((prev) => prev - 1);
          }}
          className="bg-green px-2 py-4 aria-disabled:opacity-40"
        >
          <BiRightArrowAlt />
        </Button>
      </div>
      {/* <Card filter="Итого" sum={getAccumFromCategory(data?.data)} /> */}
      <div className="grid">
        <PieChart isLoading={isLoading} data={data} />
        <h2 className="text-center mt-6">Spending for Month</h2>
        <LineChart />
      </div>
    </>
  );
};

export default Home;
