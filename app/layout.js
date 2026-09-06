import { Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import Navigation from "@/components/Navigation";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Yashvir — I make things to understand things",
  description: "Personal archive and portfolio of Yashvir.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${spaceMono.variable}`}>
      <body>
        <NoiseOverlay />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
