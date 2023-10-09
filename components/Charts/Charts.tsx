"use client";
import Chart from "react-apexcharts";

const Charts = (data) => {
  return (
    <Chart options={data.options} series={data.series} type="bar" width="500" />
  );
};

export default Charts;
