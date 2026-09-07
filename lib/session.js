import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// The secret must be at least 32 characters long.
const sessionPassword = process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long";

const sessionOptions = {
  password: sessionPassword,
  cookieName: "archive_session",
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can be false in development
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  return session;
}
