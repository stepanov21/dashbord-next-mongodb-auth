"use client";

import { Button } from "@/ui/Button";
import { signIn } from "next-auth/react";
import React from "react";

const AuthPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="btn-shadow p-4 rounded-main">
        <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          Sing In With Google
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
