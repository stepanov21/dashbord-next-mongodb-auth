import User from '@/models/user/index';
import connectToDB from '@/database/index';
import GoogleProvider from "next-auth/providers/google"
import NextAuth from 'next-auth/next';
import {NextAuthOptions} from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { NextResponse } from 'next/server';
import { Http2ServerResponse } from 'http2';

type TUser = {
  name: string; email: string
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: '324623809962-larrcf0n2jde283scfkdfjl7avikfdtm.apps.googleusercontent.com',
      clientSecret: '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'
    })
  ],
  callbacks: {
    async signIn({user, account}): Promise<typeof User | AdapterUser> {
      if(account?.provider === 'google') {
        const {name, email} = user
        try {
          await connectToDB();
          const isUserExists: boolean | null = await User.findOne({email})

          if(!isUserExists) {
            const res: Response = await fetch('http://localhost:3000/api/user', {
              method: 'POST', 
              headers: {
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({name, email})
            })
            if (res) {
              return user
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
      return user;
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
