"use client";

import { Button } from "@/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { memo, useMemo } from "react";
import UserBage from "./UserBage";

const Header = () => {
  const [userData, setUserData] = useState({});
  const { status, data } = useSession();

  useEffect(() => {
    setUserData({ ...data });
  }, [data]);

  return (
    <div className="bg-gray p-4 flex rounded-2xl w-full mb-4">
      {status === "authenticated" ? (
        <UserBage
          avatar={userData?.user?.image!}
          username={userData?.user?.name!}
          email={userData?.user?.email!}
        />
      ) : null}

      {status === "unauthenticated" ? (
        <Button onClick={() => signIn()}>Sign In</Button>
      ) : (
        <Button onClick={() => signOut()}>Sign Out</Button>
      )}
    </div>
  );
};

export default memo(Header);
