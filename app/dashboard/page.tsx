"use client";

import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";

import UserBage from "@/components/layout/UserBage";
import { GET_ALL_USERS } from "@/react-query/user/user";

const DashboardPage = () => {
  const { isLoading, error, data, refetch } = useQuery(
    ["repoData"],
    GET_ALL_USERS
  );

  if (isLoading) return;

  return (
    <div>
      <div className="grid grid-cols-1">
        {data.data ? (
          data.data.map((item, key) => (
            <UserBage
              key={key}
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
    </div>
  );
};

export default DashboardPage;
