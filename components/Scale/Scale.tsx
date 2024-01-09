import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import type { TProduct } from "@/models/product";
import { UserContext } from "@/provider/UserInfoProvider";
import { GET_PRODUCTS_BY_DAY } from "@/react-query/product/product";

const scaleColor = ["#D4E95E", "#7CBDC7", "#F1D304", "#F55353"];

const Scale = () => {
  const lineRef = useRef<HTMLDivElement>();
  const circleRef = useRef<HTMLDivElement>();

  const userInfo = useContext(UserContext);

  const [currentSum, setCurrentSum] = useState(0);

  const { isLoading, error, data, refetch } = useQuery(
    "dataByDay",
    () => GET_PRODUCTS_BY_DAY(),
    {
      onSuccess: ({ data }) =>
        setCurrentSum(
          data.reduce((acc: number, item: TProduct) => (acc += item.price), 0),
        ),
    },
  );

  const changeScaleColor = (color) => {
    lineRef.current.style.backgroundColor = color;
    circleRef.current.style.backgroundColor = color;
  };

  useEffect(() => {
    if (!lineRef.current || !circleRef.current) return;
    const currentSpending = Math.round((currentSum / userInfo.dayLimit) * 100);

    if (currentSpending >= 100) {
      lineRef.current.style.width = `${100}%`;
      circleRef.current.style.left = `${100 - 5}%`;
      changeScaleColor(scaleColor[3]);
    } else {
      if (currentSpending <= 50) {
        changeScaleColor(scaleColor[0]);
      } else if (currentSpending > 50 && currentSpending <= 75) {
        changeScaleColor(scaleColor[1]);
      } else if (currentSpending > 75) {
        changeScaleColor(scaleColor[2]);
      }

      console.log("current", currentSpending);
      lineRef.current.style.width = `${currentSpending}%`;
      circleRef.current.style.left =
        currentSpending && `${currentSpending - 2}%`;
    }
  }, [currentSum]);

  return (
    <div className="my-6 ">
      <div className="h-[6px] border-y border-y-[black] mb-4 relative">
        <div
          ref={lineRef}
          className={`h-[6px] bg-green border-b border-b-[black] mb-4 absolute transition-all ease-in duration-[1s]`}
        ></div>
        <div
          ref={circleRef}
          className={`h-[13px] w-[13px] border border-[black] rounded-full bg-green absolute translate-y-[50%] bottom-[50%] transition-all ease-in duration-[1s]`}
        ></div>
        <div
          className={`py-2 px-3 border border-[black] rounded-full bg-yellow absolute translate-y-[50%] bottom-[50%] transition-all right-0 `}
        >
          {userInfo.dayLimit}
        </div>
      </div>
    </div>
  );
};

export default Scale;
