"use client";

import Image from "next/image";

import { useLoadImage } from "@/hooks";
import { Song } from "@/types";

import { PlayButton } from "../PlayButton";

type Props = {
  data: Song;
  onClick: (id: string) => void;
};

export const SongItem = ({ data, onClick }: Props) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      onClick={() => onClick(data.id)}
    >
      <picture className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath ?? "/images/liked.png"}
          fill
          alt={data.title}
          sizes="100%"
        />
      </picture>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 truncate w-full">By {data.author}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};
