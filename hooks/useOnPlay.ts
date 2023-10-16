import { Song } from "@/types";
import { useAuthModal, usePlayer, useSubscribeModal, useUser } from "./";

export const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { onOpen } = useAuthModal();
  const { user, subscription } = useUser();
  const subscribeModal = useSubscribeModal();

  const onPlay = (id: string) => {
    if (!user) {
      return onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map(song => song.id));
  };

  return onPlay;
};
