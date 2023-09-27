import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

export const getSongsByUserId = async (): Promise<Song[]> => {
  const subabase = createServerComponentClient({
    cookies,
  });
  const { data: sessionData, error: sessionError } = await subabase.auth.getSession();

  if (sessionError) {
    console.error(sessionError.message);
  }

  const { data, error } = await subabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
};
