"use client";

import { MyUserContextProvider } from "@/hooks";

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};
