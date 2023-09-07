import { Sidebar } from "@/components/Sidebar";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const font = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MusStream-jb",
  description: "Musical Streaming Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
