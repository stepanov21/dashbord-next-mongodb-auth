"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";

import Input from "@/components/FormControls/Input";
import { queryClient } from "@/provider/QueryProvider";
import { UPDATE_USER } from "@/react-query/user/user";
import { Button } from "@/ui/Button";

import useChangeSetting from "./useChangeSetting";

const ChangeName = () => {
  const [username, setUserName] = useState("");

  const { changeSetting, userInfo } = useChangeSetting()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        changeSetting.mutate({ name: username });
      }}
      className="mt-4">
      <Input
        className="w-full"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button type="submit" className="w-full mt-2">
        Change Username
      </Button>
    </form>
  );
};

export default ChangeName;
