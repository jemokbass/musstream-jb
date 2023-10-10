"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { usePlayer, useSound } from "@/hooks";
import { Song } from "@/types";

import { MediaItem } from "../MediaItem";
import { LikeButton } from "../LikeButton";
import { Slider } from "../Slider";

type Props = {
  song: Song;
  songUrl: string;
};

export const PlayerContent = ({ song, songUrl }: Props) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const PlayIcon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = !volume ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (!player.ids) {
      return;
    }

    const currentIndex = player.ids.findIndex(id => player.activeId === id);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (!player.ids) {
      return;
    }

    const currentIndex = player.ids.findIndex(id => player.activeId === id);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return;
    }

    player.setId(previousSong);
  };

  const { sound, play, pause } = useSound(songUrl, {
    volume,
    onplay: () => {
      setIsPlaying(true);
    },
    onpause: () => {
      setIsPlaying(false);
    },
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} onClick={() => {}} />
          <LikeButton id={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <PlayIcon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayPrevious}
        />
        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <PlayIcon size={30} className="text-black" />
        </div>

        <AiFillStepForward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayNext}
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={() => setVolume(prevState => (!prevState ? 1 : 0))}
            size={34}
            className="cursor-pointer"
          />
          <Slider onChange={value => setVolume(value)} value={volume} />
        </div>
      </div>
    </div>
  );
};
