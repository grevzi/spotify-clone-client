import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import defaultProfile from "../public/default-profile.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { isTrackPlayingState, selectedTrackState } from "../atoms/track-atom";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import { SpeakerWaveIcon as SpeakerWaveDownIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "../hooks/useDebounce";

const Player = () => {
  const [volume, setVolume] = useState(50);
  const debouncedVolume = useDebounce<number>(volume, 500);

  const selectedTrack = useRecoilValue(selectedTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isTrackPlayingState);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [isPlaying, setIsPlaying]);

  const handleVolume = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  }, []);

  useEffect(() => {
    if (debouncedVolume) {
      console.log("Todo a volume set", debouncedVolume);
    }
  }, [debouncedVolume]);

  if (!selectedTrack._id) return null;

  return (
    <section
      className={
        "bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 h-24"
      }
    >
      <div className={"flex items-center space-x-4"}>
        <div className={"w-10 h-10 relative hidden md:inline-flex"}>
          <Image
            src={selectedTrack.picture ?? defaultProfile}
            alt={`${selectedTrack.name} picture`}
            layout="fill"
            objectFit="cover"
            className={"shadow-2xl"}
          />
        </div>
        <div>
          <p>{selectedTrack.name}</p>
          <p>{selectedTrack.artist}</p>
        </div>
      </div>
      <div className={"flex items-center justify-evenly"}>
        <ArrowsRightLeftIcon className={"player-button"} />
        <BackwardIcon className={"player-button"} />
        {isPlaying ? (
          <PauseCircleIcon
            className={"player-button w-10 h-10"}
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleIcon
            className={"player-button w-10 h-10"}
            onClick={handlePlayPause}
          />
        )}
        <ForwardIcon className={"player-button"} />
        <ArrowUturnLeftIcon className={"player-button"} />
      </div>
      <div className={"flex items-center justify-end space-x-3 md:space-x-4"}>
        <SpeakerWaveDownIcon
          className={"player-button"}
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          className={"w-14 md:w-28"}
          onChange={handleVolume}
        />
        <SpeakerWaveIcon
          className={"player-button"}
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
        {/*<SpeakerXMarkIcon className={"player-button"} />*/}
      </div>
    </section>
  );
};

export default Player;
