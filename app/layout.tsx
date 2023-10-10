import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import { ModalProvider, SupabaseProvider, UserProvider, ToasterProvider } from "@/providers";
import { getSongsByUserId } from "@/actions";

import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";

import "./globals.css";

const font = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MusStream-jb",
  description: "Music Streaming Platform",
};

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
            <ModalProvider />
          </UserProvider>
        </SupabaseProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
