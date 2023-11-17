"use client";

import React, { useState } from "react";

const RadioButtonLanguage = () => {
  const [value, setValue] = useState("");

  console.log("🚀 ~ file: RadioButton.tsx:7 ~ RadioButton ~ value:", value);

  return (
    <div className="tabs btn-shadow">
      <input type="radio" id="radio-1" name="tabs" checked />
      <label
        className="tab"
        htmlFor="radio-1"
        onClick={(e: any) => setValue(e.target.innerHTML)}>
        English
      </label>
      <input type="radio" id="radio-2" name="tabs" />
      <label
        className="tab"
        htmlFor="radio-2"
        onClick={(e: any) => setValue(e.target.innerHTML)}>
        Ukrainian
      </label>
      <span className="glider"></span>
    </div>
  );
};

export default RadioButtonLanguage;
