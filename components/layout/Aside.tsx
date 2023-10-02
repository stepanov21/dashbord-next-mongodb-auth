'use client'

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
  const pathname = usePathname()
  return (
    <div className="h-screen bg-gray p-10">
      <h2 className="text-3xl mb-10">Logo</h2>
      <nav>
        <h4 className="opacity-40 mb-4">Menu</h4>
        <ul className="flex flex-col gap-4">
          {menuItems &&
            menuItems.map((item, key) => {
              return (
                <Link href={item.path}>
                <li key={key} className={`flex gap-2 p-3 pr-16 rounded-xl hover:bg-green hover:text-black duration-500 ease ${pathname === item.path ? "bg-green text-black " : ""}`}>
                  {item.icon}
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
