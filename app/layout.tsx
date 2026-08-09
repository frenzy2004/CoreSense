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
  title: "CoreSense | Personal Heat-Risk Safety",
  description:
    "Individual heat-strain guidance for industrial workers, with edge decisions and a clear supervisor evidence trail.",
  openGraph: {
    title: "CoreSense | Personal Heat-Risk Safety",
    description:
      "Individual heat-strain guidance for industrial workers, with edge decisions and a clear supervisor evidence trail.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreSense | Personal Heat-Risk Safety",
    description:
      "Individual heat-strain guidance for industrial workers, with edge decisions and a clear supervisor evidence trail.",
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
