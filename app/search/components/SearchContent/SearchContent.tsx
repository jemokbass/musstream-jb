"use client";

import { Song } from "@/types";
import { useOnPlay } from "@/hooks";

import { LikeButton } from "@/components/LikeButton";
import { MediaItem } from "@/components/MediaItem";

type Props = {
  songs: Song[];
};

export const SearchContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No songs found.</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map(song => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem song={song} onClick={id => onPlay(id)} />
          </div>
          <LikeButton id={song.id} />
        </div>
      ))}
    </div>
  );
};
