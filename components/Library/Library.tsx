"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { useUser, useAuthModal, useUploadModal, useOnPlay } from "@/hooks";
import { Song } from "@/types";

import { MediaItem } from "../MediaItem";

type Props = {
  songs: Song[];
};

export const Library = ({ songs }: Props) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      authModal.onOpen();
    }
    uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 gap-4">
        <TbPlaylist size={26} className="text-neutral-500 flex-shrink-0" />
        <p className="font-medium text-sm text-neutral-400 w-full">Your Library</p>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition flex-shrink-0"
        />
      </div>
      <ul className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map(song => (
          <MediaItem key={song.id} song={song} onClick={id => onPlay(id)} />
        ))}
      </ul>
    </div>
  );
};
