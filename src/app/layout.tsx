import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import CursorFollower from "@/components/CursorFollower";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RJNF Luxury Watches | Timeless Excellence",
  description: "Exquisite mechanical timepieces crafted for the extraordinary. Discover our heritage and collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} font-sans`}>
      <body className="antialiased">
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
