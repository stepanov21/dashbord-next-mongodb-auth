"use client";

import React, { useState } from "react";
import useChangeSetting from "./useChangeSetting";

const RadioButtonLanguage = () => {

  const {changeSetting, userInfo} = useChangeSetting()


  return (
    <div className="tabs btn-shadow">
      <input type="radio" id="radio-1" name="tabs" checked={userInfo.language === "English"} />
      <label
        className="tab"
        htmlFor="radio-1"
        onClick={(e: any) => changeSetting.mutate({language: e.target.innerHTML})}>
        English
      </label>
      <input type="radio" id="radio-2" name="tabs" checked={userInfo.language === "Ukrainian"}/>
      <label
        className="tab"
        htmlFor="radio-2"
        onClick={(e: any) => changeSetting.mutate({language: e.target.innerHTML})}>
        Ukrainian
      </label>
      <span className="glider"></span>
    </div>
  );
};

export default RadioButtonLanguage;
