import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma'
import nextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcrypt'


 export const authOptions:AuthOptions = ({
  adapter: PrismaAdapter(prisma),
  providers: [
      GithubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string,
      }),
      GoogleProvider({
          clientId: process.env.GOOGLE_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      CredentialsProvider({
          name: "credentials",
          credentials: {
              email: { label: "Email", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" },
              username: { label: "Username", type: "text", placeholder: "John Smith" },
          },
          async authorize(credentials) {
            
              // check to see if email and password is there
              if(!credentials?.email || !credentials?.password) {
                  throw new Error('Please enter an email and password')
              }

              // check to see if user exists
              const user = await prisma.user.findUnique({
                  where: {
                      email: credentials.email
                  }
              });
              
              // if no user was found 
              if (!user || !user?.hashedPassword) {
                  throw new Error('No user found')
              }

              // check to see if password matches
              const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

              // if password does not match
              if (!passwordMatch) {
                  throw new Error('Incorrect password')
              }

              return user;
          },
      }),  
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
      strategy: "jwt",
  },
  pages: {
    signIn: '/signIn',
  },
  debug: process.env.NODE_ENV === "development",
      
})

// const handler = nextAuth(authOptions)
// export {handler as GET , handler as POST}
