import { atom } from "recoil";
import { Track } from "../types/track";

export const selectedTrackState = atom({
  key: "selectedTrack",
  default: {} as Track,
});

export const isTrackPlayingState = atom({
  key: "isTrackPlaying",
  default: false,
});
