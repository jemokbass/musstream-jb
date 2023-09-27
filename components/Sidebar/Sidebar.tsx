"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { Song } from "@/types";

import { Box } from "../Box";
import { SidebarItem } from "./components/SidebarItem";
import { Library } from "../Library";

type Props = {
  children: React.ReactNode;
  songs: Song[];
};

export const Sidebar = ({ children, songs }: Props) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      { label: "Home", active: pathname !== "/search", href: "/", icon: HiHome },
      { label: "Search", active: pathname === "/search", href: "/search", icon: BiSearch },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <nav className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <ul className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map(route => (
              <li key={route.label}>
                <SidebarItem {...route} />
              </li>
            ))}
          </ul>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </nav>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};
