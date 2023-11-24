"use client";

import "./globals.scss";
import Header from "@/components/layout/Header";
import Aside from "@/components/layout/Aside";
import NextAuthProvider from "@/auth-provider/index";
import QueryProvider from "@/provider/QueryProvider";
import { usePathname } from "next/navigation";
import Head from "next/head";
import UserInfoProvider from "@/provider/UserInfoProvider";
import MyThemeProvider from "@/provider/ThemeProvider";

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
      <body className="flex bg-milk min-h-screen max-w-[70vw] lg:max-w-[600px] sm:max-w-full ml-[calc(200px+(100vw-70vw-200px)/2)] lg:ml-[calc(200px+(100vw-600px-200px)/2)] sm:ml-0 w-full sm:w-screen dark:bg-darlGray dark:text-[#fff] sm:px-5">
        <NextAuthProvider>
          <QueryProvider>
            <MyThemeProvider>
              <UserInfoProvider>
                {pathname !== "/auth" && <Aside />}
                <div className="flex flex-1 flex-col border-r border-r-[black] p-6 sm:p-0 sm:mt-4 sm:border-none sm:ml-0 sm:w-screen ">
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
