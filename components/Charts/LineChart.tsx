"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { format, getDate, getDay, parseISO } from "date-fns";
import React, { memo, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";

import { GET_ALL_PRODUCTS } from "@/react-query/product/product";
import { getNumbersByMonth } from "@/utils/getNumbersByMonth";

import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const LineChart = () => {
  const {
    isLoading,
    error,
    data: dataProducts,
  } = useQuery("dataForMonth", () => GET_ALL_PRODUCTS());

  if (isLoading) return null;

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const filterByDay = (data, day) => {
    return data.filter((item) =>
      getDate(parseISO(item.createdAt)) === day ? item : null,
    );
  };

  const dataProductsByMonthDay = () => {
    return getNumbersByMonth().map((day) => {
      return filterByDay(dataProducts.data, day).reduce(
        (acc, item) => acc + item.price * item.count,
        0,
      );
    });
  };

  const data: ChartData<"line"> = {
    labels: getNumbersByMonth(),
    datasets: [
      {
        fill: true,
        label: "",
        data: dataProductsByMonthDay(),
        borderColor: "rgba(124, 189, 199, 0.5)",
        backgroundColor: "rgba(31, 123, 137, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default memo(LineChart);
