import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        await connectMongoDB();

        let user = await User.findOne({ email: profile.email });

        if (!user) {
          try {
            user = await User.create({
              username: profile.name,
              email: profile.email,
              role: "user",
            });
          } catch (error) {
            console.log("Error creating user: ", error);
            throw new Error("Failed to create user");
          }
        }

        return {
          _id: user._id.toString(),
          ...profile,
          id: profile.sub,
          role: user.role,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return {
            _id: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.role) session.user.role = token.role;
      return session;
    },

    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.role) token.role = user.role;
      return token;
    },
    async signIn({ account, profile }) {
      if (
        account.provider === "google" &&
        !profile.email.endsWith("@upou.edu.ph")
      ) {
        return "/community?error=EmailDenied";
      }
      return true; // Allow sign in for other providers or if email ends with "@upou.edu.ph"
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/community",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
