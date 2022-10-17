import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "../../../services/AuthService";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const res = await AuthService.login(data);
        const user = res.data;

        if (res.status === 201 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log({ account, user, token });
      if (account && user) {
        return {
          ...token,
          accessToken: user.access_token,
          accessTokenExpires: Date.now() * 1000,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
    },
  },
  async session({ session, token }) {
    console.log("@@@", { token });
    session.user.accessToken = token.accessToken;

    return session;
  },
};

export default NextAuth(authOptions);
