import clsx from "clsx";
import Navbar from "./fragments/Navbar";
import "./global.css";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./fragments/Footer";
const sans = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(sans.className, "dark")}>
      <body className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1200px] overflow-hidden -z-10 ">
          <div
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%,#ff0000 0deg,hsl(354,100%,50%) 54.89161972682219deg,#00a6ff 106.69924423399361deg,#4797ff 162deg,#04f 252.00000000000003deg,#ff8000 306.00000000000006deg,hsl(0,100%,50%) 360deg)",
            }}
            className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 blur-3xl animate-spin-slow w-[1200px] h-[1200px] aspect-square rounded-[50%]"
          />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
