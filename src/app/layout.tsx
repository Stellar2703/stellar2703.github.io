import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundFX } from "@/components/BackgroundFX";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { CustomCursor } from "@/components/CustomCursor";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stellar",
  description: "Full Stack Developer specializing in modern web technologies. View my projects, skills, and experience in building scalable applications.",
  keywords: ["Full Stack Developer", "Web Development", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  metadataBase: new URL("https://yourwebsite.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Portfolio | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    siteName: "Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([generatePersonSchema(), generateWebSiteSchema()]),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <ScrollProgress />
        <BackgroundFX />
        <Navbar />
        <BackToTop />
        <div className="relative pt-20">{children}</div>
      </body>
    </html>
  );
}
