import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContentFade } from "@/components/AppContentFade";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteCircuitBackdrop } from "@/components/SiteCircuitBackdrop";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  seoDefaultTitle,
  seoKeywords,
  site,
  siteUrl,
} from "@/lib/site";
import { themeInitScript } from "@/lib/themeStorage";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoDefaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [...seoKeywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: seoDefaultTitle,
    description: site.description,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaultTitle,
    description: site.description,
    images: ["/og"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
    apple: [{ url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4faf9" },
    { color: "#050807" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="page-backdrop min-h-dvh bg-page font-sans text-foreground antialiased">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <Navbar />
          <SiteCircuitBackdrop>
            <Container>
              <AppContentFade>
                {children}
                <Footer />
              </AppContentFade>
            </Container>
          </SiteCircuitBackdrop>
        </ThemeProvider>
      </body>
    </html>
  );
}
