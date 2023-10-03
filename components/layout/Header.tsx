"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { status } = useSession();
  console.log("🚀 ~ file: Header.tsx:7 ~ Header ~ status:", status);

  return (
    <div className="bg-gray p-4 m-6 flex rounded-2xl">
      <button
        onClick={() => signIn()}
        className="ml-auto bg-green px-5 py-2 rounded-xl">
        Sign In
      </button>
      <button
        onClick={() => signOut()}
        className="ml-auto bg-green px-5 py-2 rounded-xl">
        Sign Out
      </button>
    </div>
  );
};

export default Header;
