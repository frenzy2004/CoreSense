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
  title: "viAct Smart Watch | AI-IoT Worker Safety",
  description:
    "A product-led recreation of the viAct smart watch page for industrial worker safety.",
  openGraph: {
    title: "viAct Smart Watch",
    description: "AI-IoT worker safety for industrial sites.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "viAct Smart Watch",
    description: "AI-IoT worker safety for industrial sites.",
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
