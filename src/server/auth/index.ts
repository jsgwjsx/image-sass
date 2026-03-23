import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
    AuthOptions,
    DefaultSession,
    DefaultUser,
    getServerSession as nextAuthGetServerSession,
} from "next-auth";
import GitlabProvider from "next-auth/providers/gitlab";
import { db } from "@/server/db/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: AuthOptions = {
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session({ session, user }) {
            if (session.user && user) {
                session.user.id = user.id;
            }

            return session;
        },
    },
    // Customize auth pages, e.g. we create /auth/signin for better UI/hints
    pages: {
        signIn: "/auth/signin",
    },
    // Configure one or more authentication providers
    providers: [
        GitlabProvider({
            clientId:
                "f84e2e56e12dbc4f564590f785c17f551965b62cd6b4178b29618accc203187d",
            clientSecret:
                "gloas-4cf0d4e91042a05e7c37ebe37b8f2a8b893ac345ad11518bfe515a9a39829e26",
        }),
    ],
};

export function getServerSession() {
    return nextAuthGetServerSession(authOptions);
}
