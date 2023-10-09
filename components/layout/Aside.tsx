"use client";

import Link from "@/node_modules/next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard, LuUsers2, LuTable } from "react-icons/lu";

const menuItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LuLayoutDashboard size={24} />,
  },
  {
    path: "/products",
    name: "Products",
    icon: <LuTable size={24} />,
  },
  {
    path: "/visitors",
    name: "Visitors",
    icon: <LuUsers2 size={24} />,
  },
];

const Aside = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen bg-gray p-10 fixed w-[25vw] sm:h-auto bottom-0 sm:w-full sm:p-4">
      <h2 className="text-3xl mb-10 sm:hidden">Logo</h2>
      <nav>
        <h4 className="opacity-40 mb-4 sm:hidden">Menu</h4>
        <ul className="flex flex-col gap-4 sm:flex-row sm:overflow-auto">
          {menuItems &&
            menuItems.map((item, key) => {
              return (
                <Link key={key} href={item.path}>
                  <li
                    className={`flex gap-2 p-3 rounded-xl hover:bg-green duration-500 ease ${
                      pathname === item.path ? "bg-green" : ""
                    }`}>
                    <span>{item.icon}</span>
                    {item.name}
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
