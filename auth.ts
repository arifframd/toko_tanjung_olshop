import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // cek user, jika tidak ada tambahkan user ke db lewat api
      // await connectDB();

      // const existingUser = await User.findOne({ email: user.email });

      // if (!existingUser) {
      //   await User.create({
      //     name: user.name,
      //     email: user.email,
      //     image: user.image,
      //   });
      // }

      const data = {
        name: user.name,
        email: user.email,
        image: user.image,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        // cek apakah user ada lewat api
        const data = {
          email: profile.email,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();

        const existingUser = result.user._id;
        // await connectDB();
        // const existingUser = await User.findOne({ email: profile.email });

        // set token.id dengan user.id
        token.id = existingUser.toString();
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
