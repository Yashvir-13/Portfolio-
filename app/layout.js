import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import Navigation from "@/components/Navigation";

// Archive pages are backed by Neon and must query live content at request time.
// This keeps deployment builds independent of database network access.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Yashvir — I make things to understand things",
  description: "Personal archive and portfolio of Yashvir.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NoiseOverlay />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
