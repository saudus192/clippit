import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        // Normalize fields — Google and GitHub return different shapes
        const email = profile.email;
        const image =
          account.provider === "github" ? profile.avatar_url : profile.picture;
        const name = profile.name || profile.login;

        if (!email) {
          // GitHub allows private emails — block sign-in if we don't get one
          return false;
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          await User.create({
            name,
            email,
            image,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          });
        } else {
          // Keep image/name fresh on repeat logins
          existingUser.name = name;
          existingUser.image = image;
          await existingUser.save();
        }

        return true;
      } catch (error) {
        console.error("signIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        await connectDB();
        const dbUser = await User.findOne({ email: profile.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.provider = account.provider;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    },
  },

  pages: {
    // Optional: custom sign-in page path
    // signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };