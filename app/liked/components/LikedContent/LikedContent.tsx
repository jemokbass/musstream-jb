"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useOnPlay, useUser } from "@/hooks";
import { Song } from "@/types";

import { LikeButton } from "@/components/LikeButton";
import { MediaItem } from "@/components/MediaItem";

type Props = {
  songs: Song[];
};

export const LikedContent = ({ songs }: Props) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (!songs.length) {
    return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No liked songs.</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
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
