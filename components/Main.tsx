import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import defaultProfile from "../public/default-profile.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getRandomIntBetween } from "../lib/utils";

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
  console.log({ session });

  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (color) return;
    setColor(colors[getRandomIntBetween(0, 6)]);
  }, [color]);
  return (
    <div className={"flex-grow text-white"}>
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
          <ChevronDownIcon className={"w-5 h-5"} />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black h-80 p-8 ${color}`}
      >
        <Image
          src={session?.user?.image ?? defaultProfile}
          alt="user image"
          width={"40"}
          height={"40"}
          className={"rounded-full block"}
        />
      </section>
    </div>
  );
};

export default Main;
