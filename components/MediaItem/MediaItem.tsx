"use client";

import Image from "next/image";

import { useLoadImage, usePlayer } from "@/hooks";
import { Song } from "@/types";

type Props = {
  song: Song;
  onClick: (id: string) => void;
};

export const MediaItem = ({ song, onClick }: Props) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    return player.setId(song.id);
  };

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      onClick={handleClick}
    >
      <picture className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={imageUrl ?? "/images/liked.png"}
          alt={song.title}
          sizes="48px"
        />
      </picture>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </div>
  );
};
