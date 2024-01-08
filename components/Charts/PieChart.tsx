"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import { getAccumFromCategory } from "@/utils/getAccumFromCategory";

import { selectOption } from "../FormControls/selectOption";

import LabelPieChart from "./LabelPieChart";

import type {
  ChartData,
  ChartOptions} from "chart.js";
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

  console.log('Перерисовка кругялшки')

  return (
    <div className="grid grid-cols-[140px_1fr] mt-4 items-center">
      <ul className="flex flex-col gap-2">
        {category.map((item, key) => {
          return <LabelPieChart {...item} key={key} />;
        })}
      </ul>
      <div className="my-0 mx-auto mt-4 self-center">
        <Pie data={dataForChart} options={options}>
          PieChart
        </Pie>
      </div>
    </div>
  );
};

export default PieChart;
