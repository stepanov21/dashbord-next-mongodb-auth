import React from "react";
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
import { Line } from "react-chartjs-2";
import { getNumbersByMonth } from "@/utils/getNumbersByMonth";
import { format, getDate, getDay, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { GET_ALL_PRODUCTS } from "@/react-query/product/product";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = getNumbersByMonth();

console.log(getDate(parseISO("2023-10-31T09:46:49.725Z")));

export function LineChart() {
  const {
    isLoading,
    error,
    data: dataProducts,
  } = useQuery("repoData", GET_ALL_PRODUCTS);

  if (isLoading) return null;

  const filterByDay = (data, day) => {
    return data.filter((item) =>
      getDate(parseISO(item.createdAt)) === day ? item : null
    );
  };

  filterByDay(dataProducts.data, 31);

  const dataProductsByMonthDay = () => {
    return labels.map((day) => {
      return filterByDay(dataProducts.data, day).reduce(
        (acc, item) => acc + item.price,
        0
      );
    });
  };

  console.log(
    "🚀 ~ file: LineChart.tsx:75 ~ LineChart ~ dataProductsByMonthDay:",
    dataProductsByMonthDay()
  );

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: dataProductsByMonthDay(),
        borderColor: "#0DA871",
        backgroundColor: "rgba(13, 168, 113, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
