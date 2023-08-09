import { prisma } from "@/server/db/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
            //     if (!credentials?.email || !credentials?.password) {
            //         throw new Error('Invalid credentials');
            //     }
            //     else {
            //         const user = await prisma.user.findUnique({
            //         where: {
            //             email: credentials.email
            //         }
            //     });

            //     if (!user || !user?.pasword) {
            //         throw new Error('Invalid credentials');
            //     }   
            //     else{
            //         const isCorrectPassword = await bcrypt.compare(
            //         credentials.password,
            //         user.pasword
            //     );

            //     if (!isCorrectPassword) {
            //         throw new Error('Invalid credentials');
            //     }
            //     else {
            //         return user;
            //     }
            //     }
                
            // }
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
                }),
              });
      
              const user = await res.json();
              // console.log(user);
      
              if (user) {
                return user;
              } else {
                return null;
                // throw new Error("Invalid Credentials");
              }
                
            }
        })
    ],
    // callbacks: {
    //     async jwt({ token, user }) {
    //       return { ...token, ...user };
    //     },
    
    //     async session({ session, token }) {
    //       session.user = token;
    //       return session;
    //     },
    //   },
    pages: {
        signIn : '/signin',
    },
    // debug: process.env.NODE_ENV === 'development',
    session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}