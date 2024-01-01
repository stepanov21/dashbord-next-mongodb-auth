"use client";

import { queryClient } from "@/provider/QueryProvider";
import { UPDATE_USER } from "@/react-query/user/user";
import { useTheme } from "next-themes";
import { useMutation } from "react-query";

const RadioButtonTheme = ({ theme }: { theme: boolean }) => {
  const { systemTheme, setTheme } = useTheme();

  const addProduct = useMutation(UPDATE_USER, {
    onSuccess: () => queryClient.refetchQueries(["userInfo"]),
  });

  const toggleDarkMode = () => {
    addProduct.mutate({ darkmode: !theme });
    setTheme(theme ? 'light' : 'dark');
  };


  return (
    <div className="btn-shadow mt-4 p-3 rounded-main flex items-center justify-between dark:bg-gray">
      <span className="text-md font-bold">Dark Mode: </span>
      <label className="relative inline-flex items-center cursor-pointer border border-[black] rounded-full" onClick={() => toggleDarkMode()}>
        <input type="checkbox" value="" className="sr-only peer" checked={theme} disabled={addProduct.isLoading}/>
        <div aria-disabled={addProduct.isLoading} className="aria-disabled:opacity-40 w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-yellow after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green"></div>
      </label>
    </div>
  );
};

export default RadioButtonTheme;
