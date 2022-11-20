import RedditProvider from "next-auth/providers/reddit";
import NextAuth from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
