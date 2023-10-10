import { Song } from "@/types";
import { useAuthModal, usePlayer, useUser } from "./";

export const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { onOpen } = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return onOpen();
    }

    player.setId(id);
    player.setIds(songs.map(song => song.id));
  };

  return onPlay;
};
