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
    <div className="h-screen bg-gray p-10 fixed w-[25vw] sm:h-auto bottom-0 sm:w-screen sm:p-4 sm:border-t sm:border-t-[black]">
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
                    className={`flex items-center justify-center btn-shadow gap-2 py-3 mb-1 rounded-xl hover:bg-green duration-500 ease ${
                      pathname === item.path ? "bg-green shrink-1 px-2" : ""
                    }`}>
                    <span>{item.icon}</span>
                    {pathname === item.path && item.name}
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
