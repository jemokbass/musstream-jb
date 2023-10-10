"use client";

import { useGetSongById, useLoadSongByUrl, usePlayer } from "@/hooks";

import { PlayerContent } from "../PlayerContent";

export const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongByUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent song={song} songUrl={songUrl} />
    </div>
  );
};
