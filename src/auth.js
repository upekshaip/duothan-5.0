import NextAuth, { CredentialsSignin } from "next-auth";
// import Google from "next-auth/providers/google";
// import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";
import { prisma } from "@/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const logUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (logUser) {
          const isValid = await compare(credentials.password, logUser.password);
          if (!isValid) {
            return redirect("/login?error=Email or password is incorrect");
          }
          return { email: logUser.email, name: logUser.name };
        } else {
          return redirect("/login?error=Email or password is incorrect");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
