import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

export const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const { data, error } = await supabase.from("songs").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
};
