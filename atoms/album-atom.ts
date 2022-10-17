import { atom } from "recoil";
import { Album } from "../types/album";

export const selectedAlbumState = atom({
  key: "selectedAlbum",
  default: {} as Album,
});
