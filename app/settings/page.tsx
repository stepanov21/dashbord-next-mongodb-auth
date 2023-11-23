'use client'

import ChangeName from "@/components/pages/SettingsPage/ChangeName";
import LimitRange from "@/components/pages/SettingsPage/LimitRange";
import RadioButtonLanguage from "@/components/pages/SettingsPage/RadioButtonLanguage";
import RadioButtonTheme from "@/components/pages/SettingsPage/RadioButtonTheme";
import { UserContext } from "@/provider/UserInfoProvider";
import React, { useContext } from "react";

const SettigsPage = () => {
  const userInfo = useContext(UserContext);

  console.log(userInfo)

  return (
    <>
      <div>
        {/* <RadioButtonLanguage /> */}
        <RadioButtonTheme theme={userInfo?.darkmode} />
        <LimitRange />
        <ChangeName />
      </div>
    </>
  );
};

export default SettigsPage;
