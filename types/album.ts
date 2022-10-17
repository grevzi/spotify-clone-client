import { Track } from "./track";

export interface Album {
  _id: string;
  name: string;
  picture: string;
  tracks: Track[];
}
