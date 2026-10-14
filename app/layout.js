import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";

// Archive pages are backed by Neon and must query live content at request time.
// This keeps deployment builds independent of database network access.
export const dynamic = "force-dynamic";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yashvirafterhours.me'),
  title: {
    default: "Yashvir Singh — Living Archive | Software, Research & Cinema",
    template: "%s | Yashvir Singh"
  },
  description: "Personal archive and portfolio of Yashvir Singh (Yashvir). Computer science researcher and software engineer working on multi-agent LLM systems, game theory, audio DSP architectures, literature, and cinema.",
  keywords: [
    "Yashvir",
    "Yashvir Singh",
    "Yashvir portfolio",
    "Yashvir Singh portfolio",
    "Yashvir-13",
    "yashvirafterhours.me",
    "Multi-Agent LLM",
    "Game Theory Research",
    "Asteria",
    "Sonus",
    "Living Archive",
    "Computer Science Researcher",
    "Software Engineer"
  ],
  authors: [{ name: "Yashvir Singh", url: "https://yashvirafterhours.me" }],
  creator: "Yashvir Singh",
  publisher: "Yashvir Singh",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yashvir Singh — Living Archive",
    description: "Personal archive and portfolio of Yashvir Singh (Yashvir): technical architectures, game-theoretic simulations, multi-agent LLM systems, and cinema.",
    url: "https://yashvirafterhours.me",
    siteName: "Yashvir Singh — Living Archive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashvir Singh — Living Archive",
    description: "Personal archive and portfolio of Yashvir Singh (Yashvir): technical architectures, game-theoretic simulations, multi-agent LLM systems, and cinema.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://yashvirafterhours.me/#person",
      "name": "Yashvir Singh",
      "givenName": "Yashvir",
      "familyName": "Singh",
      "alternateName": ["Yashvir", "Yashvir-13", "yashvirafterhours"],
      "url": "https://yashvirafterhours.me",
      "image": "https://yashvirafterhours.me/images/asteria.jpg",
      "sameAs": [
        "https://github.com/Yashvir-13",
        "https://www.linkedin.com/in/yashvir-s-71281228a",
        "https://doi.org/10.5281/zenodo.23187620"
      ],
      "jobTitle": "Computer Science Researcher & Software Engineer",
      "knowsAbout": [
        "Multi-Agent LLM Systems",
        "Game Theory",
        "Full-Stack Software Architecture",
        "Audio Systems",
        "Philosophy & Literature",
        "Cinematography & Visual Arts"
      ],
      "description": "Personal archive of Yashvir Singh: multi-agent AI systems, full-stack software, photography, and cinema."
    },
    {
      "@type": "WebSite",
      "@id": "https://yashvirafterhours.me/#website",
      "url": "https://yashvirafterhours.me",
      "name": "Yashvir Singh — Living Archive",
      "description": "Personal archive and portfolio of Yashvir Singh",
      "publisher": {
        "@id": "https://yashvirafterhours.me/#person"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NoiseOverlay />
        <Navigation />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

