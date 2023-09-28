"use client";

import Image from "next/image";

import { useLoadImage } from "@/hooks";
import { Song } from "@/types";

type Props = {
  song: Song;
  onClick: (id: string) => void;
};

export const MediaItem = ({ song, onClick }: Props) => {
  const imageUrl = useLoadImage(song);

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      onClick={() => onClick(song.id)}
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
