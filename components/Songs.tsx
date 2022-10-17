import React, { FC } from "react";
import { Track } from "../types/track";
import Song from "./Song";

const Songs: FC<{ tracks: Track[] }> = ({ tracks }) => {
  return (
    <ul className={"px-8 flex flex-col space-y-1 pb-28 text-white"}>
      {tracks.map((track, index) => (
        <li key={track._id}>
          <Song track={track} order={index + 1} />
        </li>
      ))}
    </ul>
  );
};

export default Songs;
