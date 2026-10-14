import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";

// Archive pages are backed by Neon and must query live content at request time.
// This keeps deployment builds independent of database network access.
export const dynamic = "force-dynamic";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yashvir.me'),
  title: {
    default: "Yashvir — Living Archive",
    template: "%s | Yashvir"
  },
  description: "Personal archive and portfolio of Yashvir: technical architectures, game-theoretic simulations, multi-agent frameworks, and computational artifacts.",
  openGraph: {
    title: "Yashvir — Living Archive",
    description: "Personal archive and portfolio of Yashvir: technical architectures, game-theoretic simulations, multi-agent frameworks, and computational artifacts.",
    url: "https://yashvir.me",
    siteName: "Yashvir's Living Archive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashvir — Living Archive",
    description: "Personal archive and portfolio of Yashvir: technical architectures, game-theoretic simulations, multi-agent frameworks, and computational artifacts.",
  },
  robots: {
    index: true,
    follow: true,
  }
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
