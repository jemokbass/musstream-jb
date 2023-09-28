import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

import { getSongs } from ".";

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const subabase = createServerComponentClient({
    cookies,
  });

  if (!title) {
    const songs = await getSongs();
    return songs;
  }

  const { data, error } = await subabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
};
