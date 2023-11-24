import { IUser } from "@/models/user";
import { GET_USER_INFO } from "@/react-query/user/user";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { createContext, useContext, useEffect } from "react";
import { useQuery } from "react-query";

export const UserContext = createContext<Partial<IUser>>({});

const UserInfoProvider = ({ children }) => {
  const { data: session} = useSession()
  const { isLoading, error, data, refetch } = useQuery(
    "userInfo",
    () => GET_USER_INFO(),
    {
      onSuccess: () => console.log("Инфа юзера пришла !"),
    }
  );

  useEffect(() => {
    refetch()
  }, [session])

  const { systemTheme, theme, setTheme } = useTheme();
  const userInfo = useContext(UserContext)

  useEffect(() => {
    setTheme(data?.data?.darkmode ? "dark" : "light")
  }, [data?.data?.darkmode])

  if(isLoading) return null;

  return <UserContext.Provider value={data?.data}>{children}</UserContext.Provider>;
};

export default UserInfoProvider;
