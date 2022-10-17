import { Album } from "./album";

export interface Track {
  _id: string;
  name: string;
  picture: string;
  text: string;
  audio: string;
  album?: Album;
  artist: string;
  listeners: number;
}
