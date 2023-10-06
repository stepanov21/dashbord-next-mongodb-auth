"use client";

import { Button } from "@/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { status } = useSession();

  return (
    <div className="bg-gray p-4 m-6 flex rounded-2xl">
      {status === "unauthenticated" ? (
        <Button onClick={() => signIn()}>Sign In</Button>
      ) : (
        <Button onClick={() => signOut()}>Sign Out</Button>
      )}
    </div>
  );
};

export default Header;
