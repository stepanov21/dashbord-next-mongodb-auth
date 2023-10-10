"use client";

import Chart from "react-apexcharts";

const Charts = (data: any) => {
  return (
    <Chart options={data.options} series={data.series} type="bar" width="500" />
  );
};

export default Charts;
