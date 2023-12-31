"use client";

import "./globals.scss";
import Header from "@/components/layout/Header";
import Aside from "@/components/layout/Aside";
import NextAuthProvider from "@/auth-provider/index";
import QueryProvider from "@/provider/QueryProvider";
import { usePathname } from "next/navigation";
import UserInfoProvider from "@/provider/UserInfoProvider";
import MyThemeProvider from "@/provider/ThemeProvider";
import { twMerge } from "tailwind-merge";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
      className={twMerge('flex bg-milk min-h-screen max-w-[70vw] lg:max-w-[600px] sm:max-w-full ml-[calc(200px+(100vw-70vw-200px)/2)] lg:ml-[calc(200px+(100vw-600px-200px)/2)] sm:ml-0 w-full sm:w-screen dark:bg-darlGray dark:text-[#fff] sm:px-5', pathname === "/auth" && 'flex items-center justify-center m-auto lg:m-auto')}>
        <NextAuthProvider>
          <QueryProvider>
            <MyThemeProvider>
              <UserInfoProvider>
                {pathname !== "/auth" && <Aside />}
                <div className={twMerge("flex flex-1 flex-col rounded-main m-6 border border-[black] p-4 sm:p-0 sm:mt-4 sm:border-none sm:mx-0 sm:w-screen ", pathname === "/auth" && 'border-none')}>
                  {pathname !== "/auth" && <Header />}
                  <main className="mb-[70px]">{children}</main>
                </div>
              </UserInfoProvider>
            </MyThemeProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
