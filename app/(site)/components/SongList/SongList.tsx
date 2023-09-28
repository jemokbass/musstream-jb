"use client";

import { SongItem } from "@/components/SongItem";
import { Song } from "@/types";

type Props = {
  songs: Song[];
};

export const SongList = ({ songs }: Props) => {
  if (!songs.length) {
    return <h2 className="mt-4 text-neutral-400">No songs available</h2>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map(song => (
        <SongItem key={song.id} data={song} onClick={() => {}} />
      ))}
    </div>
  );
};
