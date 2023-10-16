import { Howl, Howler, HowlOptions } from "howler";
import { useCallback, useEffect, useMemo } from "react";

export const useSound = (songUrl: string, options?: Partial<HowlOptions>) => {
  const sound = useMemo(
    () => new Howl({ src: songUrl, format: ["mp3"], html5: true, ...options }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(songUrl)]
  );

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [songUrl, sound]);

  useEffect(() => {
    if (typeof options?.volume === "number") {
      Howler.volume(options.volume);
    }
  }, [options?.volume]);

  const play = useCallback(
    (id?: number) => {
      if (!sound) {
        return;
      }

      sound.play(id);
    },
    [sound]
  );

  const pause = useCallback(
    (id?: number) => {
      if (!sound) {
        return;
      }
      sound.pause(id);
    },
    [sound]
  );

  return { sound, play, pause };
};
