import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../model/user";
import dbConnect from "./dbconnect";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "example",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    throw new Error('Please fill provide username and password');

                }
                await dbConnect();
                const user = await User.findOne({
                    username: credentials.username
                });
                if (!user) {
                    throw new Error('User does not exist');
                }

                if (credentials.password !== user.password) {
                    throw new Error('Username and Password Combination do not Match');
                }

                return {
                    id: user._id.toString(),
                    name: user.username,
                    email: user.email,
                    randomKey: "The best random key",
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
    secret: 'thisisanawesomesecret'
};
