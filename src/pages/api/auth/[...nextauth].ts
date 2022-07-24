import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_email"), q.Casefold(user.email)))
            ),
            q.Create(q.Collection("users"), {
              data: { email: user.email },
            }),
            q.Get(q.Match(q.Index("user_email"), q.Casefold(user.email)))
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});
