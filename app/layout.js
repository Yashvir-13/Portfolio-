import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";

// Archive pages are backed by Neon and must query live content at request time.
// This keeps deployment builds independent of database network access.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Yashvir — If any of this makes sense, let me know",
  description: "Personal archive and portfolio of Yashvir.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NoiseOverlay />
        <Navigation />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
