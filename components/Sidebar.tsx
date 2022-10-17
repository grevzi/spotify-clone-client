import React, { useEffect, useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { AlbumService } from "../services/AlbumService";
import { Album } from "../types/album";
import { useSetRecoilState } from "recoil";
import { selectedAlbumState } from "../atoms/album-atom";

const Sidebar = () => {
  const { data: session } = useSession();
  const [album, setAlbum] = useState<Album[]>([]);
  const setSelectedAlbum = useSetRecoilState(selectedAlbumState);

  useEffect(() => {
    const getData = async () => {
      const res = await AlbumService.getAll({ limit: 10, offset: 0 });
      return res.data;
    };
    getData().then((data) => setAlbum(data));
  }, []);
  return (
    <div
      className={
        "p-5 text-gray-500 text-xs border-r border-gray-900 overflow-y-auto h-screen scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36"
      }
    >
      <div className={"space-y-4"}>
        <button
          className={
            "flex items-center space-x-2 text-gray-500 hover:text-white"
          }
        >
          <HomeIcon className={"w-5 h-5"} />
          <p>Home</p>
        </button>
        <button
          className={
            "flex items-center space-x-2 text-gray-500 hover:text-white"
          }
        >
          <MagnifyingGlassIcon className={"w-5 h-5"} />
          <p>Search</p>
        </button>
        <button
          className={
            "flex items-center space-x-2 text-gray-500 hover:text-white"
          }
        >
          <BuildingLibraryIcon className={"w-5 h-5"} />
          <p>Your Library</p>
        </button>
        <hr className={"border-gray-900 border-t-[0.1px]"} />

        <button
          className={
            "flex items-center space-x-2 text-gray-500 hover:text-white"
          }
        >
          <PlusCircleIcon className={"w-5 h-5"} />
          <p>Create Playlist</p>
        </button>
        <button
          className={
            "flex items-center space-x-2 text-gray-500 hover:text-white"
          }
        >
          <HeartIcon className={"w-5 h-5"} />
          <p>Liked Songs</p>
        </button>
        <button
          className={
            "flex items-center space-x-2 text-gray-500 hover:text-white"
          }
        >
          <RssIcon className={"w-5 h-5"} />
          <p>Your episodes</p>
        </button>

        <hr className={"border-gray-900 border-t-[0.1px]"} />
        {session ? (
          <button
            className={
              "flex items-center space-x-2 text-gray-500 hover:text-white"
            }
            onClick={() => signOut()}
          >
            <ArrowRightOnRectangleIcon className={"w-5 h-5"} />
            <p>Logout</p>
          </button>
        ) : (
          <Link href={"/login"}>
            <a
              className={
                "flex items-center space-x-2 text-gray-500 hover:text-white"
              }
            >
              <ArrowLeftOnRectangleIcon className={"w-5 h-5"} />
              <p>Login</p>
            </a>
          </Link>
        )}
        <hr className={"border-gray-900 border-t-[0.1px]"} />

        {album.map((album) => (
          <p
            key={album._id}
            onClick={() => setSelectedAlbum(album)}
            className={"cursor-pointer hover:text-white"}
          >
            {album.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
