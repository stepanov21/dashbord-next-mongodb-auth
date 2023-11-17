import LimitRange from "@/components/pages/SettingsPage/LimitRange";
import RadioButtonLanguage from "@/components/pages/SettingsPage/RadioButtonLanguage";
import RadioButtonTheme from "@/components/pages/SettingsPage/RadioButtonTheme";
import React from "react";

const SettigsPage = () => {
  return (
    <>
      <div>
        <RadioButtonLanguage />
        <RadioButtonTheme />
        <LimitRange />
      </div>
    </>
  );
};

export default SettigsPage;
