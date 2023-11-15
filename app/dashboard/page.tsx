"use client";

import UserBage from "@/components/layout/UserBage";
import { GET_ALL_USERS } from "@/react-query/user/user";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";

const DashboardPage = () => {
  const { isLoading, error, data, refetch } = useQuery(
    ["repoData"],
    GET_ALL_USERS
  );

  const lineRef = useRef<HTMLDivElement>();
  const circleRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!lineRef.current || !circleRef.current) return;
    const days = 150;
    lineRef.current.style.width = `${days + 6}px`;
    circleRef.current.style.left = `${days}px`;
  });

  if (isLoading) return;

  console.log(data);

  return (
    <div>
      <div className="h-[6px] border-y border-y-[black] mb-4 relative">
        <div
          ref={lineRef}
          className={`h-[6px] bg-green border-b border-b-[black] mb-4 absolute`}></div>
        <div
          ref={circleRef}
          className={`h-[13px] w-[13px] border border-[black] rounded-full bg-green absolute translate-y-[50%] bottom-[50%]`}></div>
      </div>
      {data.data ? (
        data.data.map((item) => (
          <UserBage
            className="border border-[black] rounded-main p-2 mb-2"
            avatar={item.image}
            username={item.name}
            email={item.email}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DashboardPage;
