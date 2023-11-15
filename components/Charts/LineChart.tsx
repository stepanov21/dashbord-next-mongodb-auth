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
  ChartData,
  ChartOptions,
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

export const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = getNumbersByMonth();

export function LineChart() {
  const {
    isLoading,
    error,
    data: dataProducts,
  } = useQuery("dataForMonth", () => GET_ALL_PRODUCTS());

  if (isLoading) return null;

  console.log(dataProducts);

  const filterByDay = (data, day) => {
    return data.filter((item) =>
      getDate(parseISO(item.createdAt)) === day ? item : null
    );
  };

  const dataProductsByMonthDay = () => {
    return labels.map((day) => {
      return filterByDay(dataProducts.data, day).reduce(
        (acc, item) => acc + item.price,
        0
      );
    });
  };

  const data: ChartData<"line"> = {
    labels,
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
}
