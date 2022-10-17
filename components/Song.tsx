import React, { FC } from "react";
import { Track } from "../types/track";
import Image from "next/image";
import defaultProfile from "../public/default-profile.svg";
import { useSetRecoilState } from "recoil";
import { isTrackPlayingState, selectedTrackState } from "../atoms/track-atom";

const Song: FC<{ track: Track; order: number }> = ({ track, order }) => {
  const setSelectedTrack = useSetRecoilState(selectedTrackState);
  const setIsTrackPlaying = useSetRecoilState(isTrackPlayingState);

  const playSong = () => {
    setSelectedTrack(track);
    setIsTrackPlaying(true);
  };

  return (
    <button
      className={
        "grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      }
      onClick={playSong}
    >
      <div className={"flex items-center space-x-4"}>
        <p>{order}</p>
        <div className={"w-10 h-10 relative"}>
          <Image
            src={track.picture ?? defaultProfile}
            alt={`${track.name} picture`}
            layout="fill"
            objectFit="cover"
            className={"shadow-2xl"}
          />
        </div>
        <div className={"text-left"}>
          <p className={"w-36 lg:w-64 truncate text-white"}>{track.name}</p>
          <p className={"w-40 "}>{track.artist}</p>
        </div>
      </div>
      <div className={"flex items-center justify-between ml-auto md:ml-0"}>
        <p className={"hidden md:inline w-40"}>
          {track?.album?.name ?? "unknown"}
        </p>
        <p>listeners: {track.listeners}</p>
      </div>
    </button>
  );
};

export default Song;
