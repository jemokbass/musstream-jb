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
    <div className="fixed bottom-0 bg-black w-full h-[83px]">
      <PlayerContent song={song} songUrl={songUrl} />
    </div>
  );
};
