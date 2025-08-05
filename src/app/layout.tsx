import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: process.env.META_TITLE || "Business Website",
  description: process.env.META_DESCRIPTION || "Professional business website",
  keywords: process.env.META_KEYWORDS || "business, professional",
  authors: [{ name: process.env.BUSINESS_NAME || "Business" }],
  creator: process.env.BUSINESS_NAME || "Business",
  publisher: process.env.BUSINESS_NAME || "Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: process.env.META_TITLE || "Business Website",
    description: process.env.META_DESCRIPTION || "Professional business website",
    url: `https://${process.env.DOMAIN_NAME}`,
    siteName: process.env.BUSINESS_NAME || "Business",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://${process.env.DOMAIN_NAME}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${process.env.BUSINESS_NAME} - ${process.env.BUSINESS_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.META_TITLE || "Business Website",
    description: process.env.META_DESCRIPTION || "Professional business website",
    images: [`https://${process.env.DOMAIN_NAME}/twitter-image.jpg`],
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
  alternates: {
    canonical: `https://${process.env.DOMAIN_NAME}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={process.env.PRIMARY_COLOR || "#000000"} />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary-color: ${process.env.PRIMARY_COLOR || "#000000"};
              --secondary-color: ${process.env.SECONDARY_COLOR || "#6366f1"};
              --accent-color: ${process.env.ACCENT_COLOR || "#f97316"};
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
