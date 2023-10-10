"use client";
import { useEffect, useState } from "react";

export default function ApexChart(data: any) {
  const [Chart, setChart] = useState<any>();
  const hasType = typeof data?.type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return (
    hasType &&
    Chart && (
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width="500"
      />
    )
  );
}

// <Chart options={data.options} series={data.series} type="bar" width="500" />
