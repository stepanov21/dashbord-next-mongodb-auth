"use client";

import { TProduct } from "@/models/product";
import { GET_ALL_PRODUCTS } from "@/react-query/product/product";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ScaleChartOptions,
  CommonElementOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import { selectOption } from "../FormControls/selectOption";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { isLoading, error, data } = useQuery("repoData", GET_ALL_PRODUCTS);

  if (!isLoading) {
    const getAccumFromCategory = (data: TProduct[], filter: string) => {
      const category = data.filter((item) =>
        item.category === filter ? item : null
      );
      return category.reduce((a, i) => a + i.price, 0);
    };

    const dataForChart: ChartData<"pie"> = {
      labels: selectOption,
      datasets: [
        {
          label: "# of Votes",
          data: selectOption.map((item) =>
            getAccumFromCategory(data.data, item)
          ),
          backgroundColor: [
            "#0DA871",
            "#EEEBD3",
            "#A98743",
            "#F7C548",
            "#1B512D",
            "#985277",
            "#C14953",
          ],
          borderWidth: 0,
        },
      ],
    };

    const options: ChartOptions<"pie"> = {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
            color: "rgb(255, 255, 255)",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    return (
      <div className="my-0 mx-auto mt-4 w-full">
        <Pie data={dataForChart} options={options}>
          PieChart
        </Pie>
      </div>
    );
  }
};

export default PieChart;
