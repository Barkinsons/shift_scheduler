import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.pwHash,
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Customize redirect after successful sign-in
      // For example, redirect to the dashboard or home page
      return baseUrl; // Redirects to the home page after login
    },
    async session({ session, token, user }) {
      console.log(token);
      // Add role value to user object so it is passed along with session
      session.user.role = user?.role ? user.role : token.user.role;
      session.user.id = user?._id ? user._id : token.user._id;
      return session;
    },
    async jwt({ token, account, user }) {
      //if the user logs in, you save your user in token
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: "/signin",
  },
});
