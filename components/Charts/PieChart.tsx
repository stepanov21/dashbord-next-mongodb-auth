"use client";

import { TProduct } from "@/models/product";
import { GET_ALL_PRODUCTS } from "@/react-query/product/product";
import { cn } from "@/utils/cn";
import { getAccumFromCategory } from "@/utils/getAccumFromCategory";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import { selectOption } from "../FormControls/selectOption";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ isLoading, data }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (isLoading) return;
    setCategory(
      selectOption
        .map((item) => getAccumFromCategory(data.data, item))
        .filter((item) => item.sum !== 0)
    );
  }, [isLoading, data]);

  if (isLoading) null;

  const dataForChart: ChartData<"pie"> = {
    labels: ["undefined"],
    datasets: [
      {
        label: "# of Votes",
        data: category.map((item) => item.sum),
        backgroundColor: category.map((item) => item.color),
        borderWidth: 1,
        borderColor: "#000000",
      },
    ],
  };

  console.log(category.filter((item) => (item.sum !== 0 ? item.color : null)));

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-[140px_1fr] mt-4 items-center">
      <ul className="flex flex-col gap-2">
        {category.map((item, key) => {
          return (
            <li
              className="flex gap-2 items-center p-2 border border-[#000] rounded-main "
              key={key}>
              <span
                className={cn(
                  `min-h-[10px] min-w-[10px] inline-block rounded-full border border-[#000]
                `,
                  `bg-[${item.color}]`
                )}></span>
              {item.name}
            </li>
          );
        })}
      </ul>
      <div className="my-0 ml-auto mt-4 w-[50vw] self-center">
        <Pie data={dataForChart} options={options}>
          PieChart
        </Pie>
      </div>
    </div>
  );
};

export default PieChart;
