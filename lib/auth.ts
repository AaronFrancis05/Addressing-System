import { betterAuth } from "better-auth";

import { emailOTP } from "better-auth/plugins";
import {db} from "@/db/drizzle";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import { sendVerificationEmail, sendResetPasswordEmail } from "@/lib/email";
import {schema} from '@/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(data, request) {
      try {
        await sendResetPasswordEmail(data.user.email, data.url);
      } catch (error) {
        console.error("Error sending reset password email:", error);
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          await sendVerificationEmail(email, otp);
        } catch (e) {
          console.error("Error in sendVerificationOTP plugin wrapper:", e);
          // Fallback logging for development
          console.log(`[DEV FALLBACK] OTP for ${email}: ${otp}`);
        }
      },
    }),
  ],
});
