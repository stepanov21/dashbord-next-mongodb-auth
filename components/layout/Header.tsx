"use client";

import { Button } from "@/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { memo } from "react";
import UserBage from "./UserBage";

const Header = () => {
  const { status, data } = useSession();

  return (
    <div className="bg-gray p-4 flex rounded-2xl w-full mb-4">
      {status === "authenticated" ? (
        <UserBage
          avatar={data?.user?.image!}
          username={data?.user?.name!}
          email={data?.user?.email!}
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

export default Header;
