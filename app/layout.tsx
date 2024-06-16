import clsx from "clsx";
import Navbar from "./fragments/Navbar";
import "./global.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(inter.className, "dark")}>
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
