import GoogleProvider from "next-auth/providers/google";

import connectToDB from "@/database/index";
import User from "@/models/user/index";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "324623809962-larrcf0n2jde283scfkdfjl7avikfdtm.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        const { name, email, image } = user;
        try {
          await connectToDB();
          const isUserExists: boolean | null = await User.findOne({ email });

          if (!isUserExists) {
            const res: Response = await fetch(
              `${process.env.NEXTAUTH_URL}/api/user/add-user`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, image }),
              },
            );
            if (res) {
              return user;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
};
