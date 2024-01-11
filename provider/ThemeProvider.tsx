"use client";

import { ThemeProvider } from "next-themes";

const MyThemeProvider = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default MyThemeProvider;
