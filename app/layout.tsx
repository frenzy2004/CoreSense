import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://core-sense.vercel.app"),
  title: "CoreSense — Heat-health actions workers can use",
  description:
    "CoreSense is a privacy-limited worker heat-strain advisory system that combines an action-first wrist display, site heat context, supervisor response and a reviewable evidence trail.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CoreSense — Heat-health actions workers can use",
    description:
      "From invisible heat strain to one clear action: work safely, pause, or rest now.",
    url: "/",
    siteName: "CoreSense",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreSense — Heat-health actions workers can use",
    description:
      "From invisible heat strain to one clear action: work safely, pause, or rest now.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
