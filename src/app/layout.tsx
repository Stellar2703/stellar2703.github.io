import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundFX } from "@/components/BackgroundFX";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  description: "Aspiring Software Engineer specializing in backend systems, full-stack applications, and cloud-native architectures. View my projects, skills, and experience.",
  icons: {
    icon: "/head.jpeg",
    shortcut: "/head.jpeg",
    apple: "/head.jpeg",
  },
  keywords: ["Software Engineer", "Backend Developer", "DevOps", "Cloud Architect", "Shashwath V R", "Portfolio"],
  authors: [{ name: "Shashwath V R" }],
  creator: "Shashwath V R",
  metadataBase: new URL("https://stellar2703.github.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stellar2703.github.io",
    title: "Shashwath V R | Software Engineer Portfolio",
    description: "Aspiring Software Engineer specializing in backend systems, full-stack applications, and cloud-native architectures.",
    siteName: "Shashwath V R Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shashwath V R Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashwath V R | Software Engineer Portfolio",
    description: "Aspiring Software Engineer specializing in backend systems, full-stack applications, and cloud-native architectures.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([generatePersonSchema(), generateWebSiteSchema()]),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ScrollProgress />
          <BackgroundFX />
          <Navbar />
          <BackToTop />
          <div className="relative pt-20">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

