"use client";

import { UserContext } from "@/provider/UserInfoProvider";
import { Button } from "@/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import UserBage from "./UserBage";

const Header = () => {
  const userInfo = useContext(UserContext)
  
  console.log("🚀 ~ file: Header.tsx:11 ~ Header ~ userInfo:", userInfo)
  

  return (
    <div className="flex rounded-2xl w-full mb-5 items-center">
        <UserBage
          avatar={userInfo?.image}
          username={userInfo?.name}
          email={userInfo?.email}
        />
        <Button
          className="ml-auto"
          onClick={() => signOut({ callbackUrl: "/auth" })}>
          Sign Out
        </Button>
    </div>
  );
};

export default Header;
