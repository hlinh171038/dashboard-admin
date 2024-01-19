import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma'


const authOptions:AuthOptions = ({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {

            if(!credentials?.email || !credentials?.password) {
                throw new Error ('Invalid credentials')
            }
          const user = await prisma.user.findUnique({
            where: {
                email: credentials.email
            }
          })
    
          if (user) {
            return user
          } else {
            return null
          }
        }
      })
  ],

  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV ==='development',
      
})

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}