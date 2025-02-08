import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fontok beállítása
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLÁZAÁSZ",
  description: "All rights reserved by: PLÁZAÁSZ",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico", 
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon-180x180.png",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.ico", 
    },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
