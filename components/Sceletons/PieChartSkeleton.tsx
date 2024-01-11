const PieChartSkeleton = () => {
  return (
    <div className="grid grid-cols-[140px_1fr] mt-4 items-center">
      <div className="flex flex-col gap-2">
        <li className="flex gap-2 items-center p-4 dark:bg-gray rounded-main bg-skeleton "></li>
        <li className="flex gap-2 items-center p-4 dark:bg-gray rounded-main bg-skeleton "></li>
        <li className="flex gap-2 items-center p-4 dark:bg-gray rounded-main bg-skeleton "></li>
      </div>
      <div
        className="my-0 mx-auto mt-4 self-center h-[300px] w-[300px] bg-skeleton"
        style={{ borderRadius: "50%" }}
      ></div>
    </div>
  );
};

export default PieChartSkeleton;
