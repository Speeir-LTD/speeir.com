import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Auth.js only trusts the request host automatically in dev or on Vercel.
  // Netlify (and `next start`) need this, or every /api/auth/* call fails
  // with UntrustedHost before it reaches a provider.
  trustHost: true,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminPasswordHash) return null;
        if (email !== adminEmail) return null;

        const valid = await bcrypt.compare(password, adminPasswordHash);
        if (!valid) return null;

        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
});
