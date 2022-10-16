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
import { useSpotify } from "../hooks/useSpotify";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    console.log("!!", spotifyApi);
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        console.log({ res });
        // @ts-ignore
        setPlaylists(res.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <div
      className={
        "p-5 text-gray-500 text-sm border-r border-gray-900 overflow-y-auto h-screen scrollbar-hide"
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

        {/*Play lists*/}
        <p className={"cursor-pointer hover:text-white"}>Playlist name</p>
      </div>
    </div>
  );
};

export default Sidebar;
