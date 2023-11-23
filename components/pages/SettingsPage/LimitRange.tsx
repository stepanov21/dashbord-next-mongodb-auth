"use client";

import { Button } from "@/ui/Button";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import useChangeSetting from "./useChangeSetting";

const LimitRange = () => {
  const [limit, setLimit] = useState<number>(null);

  const {changeSetting, userInfo} = useChangeSetting();

  useEffect(() => {

    setLimit(userInfo?.dayLimit)
  }, [])

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        changeSetting.mutate({ dayLimit: limit });
      }}>
      <div className="flex justify-between my-2">
        <span>200</span>
        <span>2000</span>
      </div>
      <input
        id="default-range"
        type="range"
        defaultValue={limit}
        min={"200"}
        max={"2000"}
        step={"100"}
        onChange={(e) => setLimit(+e.target.value)}
        className="w-full h-2 border border-[black] rounded-main cursor-pointer appearance-none bg-milk in-range:bg-yellow in-range:border out-of-range:bg-yellow"
      />
      <div className="flex justify-between mt-3">
        <span className="px-3 py-2 btn-shadow bg-yellow flex items-center justify-center rounded-main">
          {limit}
        </span>
        <Button type="submit">Change Limit</Button>
      </div>
    </form>
  );
};

export default LimitRange;
