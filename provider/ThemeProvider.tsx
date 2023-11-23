import { ThemeProvider, useTheme } from "next-themes"
import { useContext, useEffect } from "react";
import { UserContext } from "./UserInfoProvider";

const MyThemeProvider = ({children}) => {

  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}

export default MyThemeProvider;