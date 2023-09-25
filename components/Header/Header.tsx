"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useAuthModal, useUser } from "@/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "../Button";
import { toast } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Header = ({ children, className }: Props) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div className={twMerge("h-fit bg-gradient-to-b from-sky-500 p-6", className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <>
            {user ? (
              <div className="flex gap-x-4 items-center">
                <Button onClick={() => router.push("/account")} className="bg-white">
                  <FaUserAlt />
                </Button>
                <Button onClick={handleLogout} className="bg-white px-6 py-2  border">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Button className="bg-transparent text-neutral-300 font-medium" onClick={() => onOpen()}>
                    Sign Up
                  </Button>
                </div>
                <div>
                  <Button className="bg-white px-6 py-2" onClick={() => onOpen()}>
                    Log In
                  </Button>
                </div>
              </>
            )}
          </>
        </div>
      </div>
      {children}
    </div>
  );
};
