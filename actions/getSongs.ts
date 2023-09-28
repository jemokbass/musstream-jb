import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSongs = async (): Promise<Song[]> => {
  const subabase = createServerComponentClient({
    cookies,
  });
  const { data, error } = await subabase.from("songs").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
};
