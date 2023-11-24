"use client";

import Link from "@/node_modules/next/link";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuUsers2,
  LuTable,
  LuSettings,
} from "react-icons/lu";

const menuItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LuLayoutDashboard size={18} />,
  },
  {
    path: "/products",
    name: "Products",
    icon: <LuTable size={18} />,
  },
  {
    path: "/dashboard",
    name: "Visitors",
    icon: <LuUsers2 size={18} />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <LuSettings size={18} />,
  },
];

const Aside = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen bg-gray p-4 fixed w-[200px] ml-[calc((100vw-70vw-200px)/2)] lg:ml-[calc((100vw-600px-200px)/2)] sm:ml-0 sm:h-auto bottom-0 left-0 border-x border-[black] sm:w-screen sm:border-x-0 sm:border-t sm:border-t-[black] sm:bg-milk sm:dark:bg-gray">
      <h2 className="text-4xl mb-10 sm:hidden">
        | Save<span className="text-green">Money |</span>
      </h2>
      <nav className="">
        <h4 className="opacity-40 mb-4 sm:hidden">Menu</h4>
        <ul className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          {menuItems &&
            menuItems.map((item, key) => {
              return (
                <Link className="flex-1" key={key} href={item.path}>
                  <li
                    className={`flex items-center sm:justify-center px-2 sm:px-3 btn-shadow py-3 mb-1 rounded-xl hover:bg-green duration-500 ease ${
                      pathname === item.path
                        ? "bg-green shrink-1 px-2 text-black"
                        : ""
                    }`}>
                    <span>{item.icon}</span>
                    {pathname === item.path ? (
                      <span className="hidden sm:inline ml-2">
                        {pathname === item.path && item.name}
                      </span>
                    ) : null}

                    <span className="sm:hidden ml-2">{item.name}</span>
                  </li>
                </Link>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default Aside;
