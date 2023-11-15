"use client";

import { Button } from "@/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import UserBage from "./UserBage";

const Header = () => {
  const { status, data } = useSession();

  return (
    <div className="bg-gray flex rounded-2xl w-full mb-5 items-center">
      {status === "authenticated" ? (
        <UserBage
          avatar={data?.user?.image!}
          username={data?.user?.name!}
          email={data?.user?.email!}
        />
      ) : null}

      {status === "unauthenticated" ? (
        <Button className="ml-auto" onClick={() => signIn()}>
          Sign In
        </Button>
      ) : (
        <Button className="ml-auto" onClick={() => signOut()}>
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Header;
