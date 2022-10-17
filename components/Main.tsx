import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import defaultProfile from "../public/default-profile.svg";
import { getRandomIntBetween } from "../lib/utils";
import { useRecoilValue } from "recoil";
import { selectedAlbumState } from "../atoms/album-atom";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Main = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState<string>("");
  const selectedAlbum = useRecoilValue(selectedAlbumState);

  useEffect(() => {
    setColor(colors[getRandomIntBetween(0, 6)]);
  }, []);
  return (
    <div
      className={
        "flex-grow text-white h-screen overflow-y-scroll scrollbar-hide"
      }
    >
      <header className={"absolute top-5 right-8 "}>
        <div
          className={
            "flex items-center bg-black space-x-3 opacity-90 cursor-pointer rounded-full p-1 pr-2 hover:opacity-80"
          }
        >
          <Image
            src={session?.user?.image ?? defaultProfile}
            alt="user image"
            width={"40"}
            height={"40"}
            className={"rounded-full block"}
          />
          <p>{session?.user?.name ?? "Guest"}</p>
        </div>
      </header>

      <section className={`flex flex-col`}>
        {selectedAlbum?._id && (
          <>
            <div
              className={`flex h-80 items-end space-x-7 p-8 bg-gradient-to-b to-black ${color}`}
            >
              <div className={"w-44 h-44 relative"}>
                <Image
                  src={selectedAlbum.picture ?? defaultProfile}
                  alt="user image"
                  layout="fill"
                  objectFit="cover"
                  className={"shadow-2xl"}
                />
              </div>
              <div>
                <p>ALBUM:</p>
                <p className={"text-2xl md:text-3xl xl:text-5xl font-bold"}>
                  {selectedAlbum.name}
                </p>
              </div>
            </div>
            <Songs tracks={selectedAlbum.tracks} />
          </>
        )}
      </section>
    </div>
  );
};

export default Main;
