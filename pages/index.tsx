import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Main from "../components/Main";

const Home: NextPage = () => {
  return (
    <div className=" ">
      <Head>
        <title>Home | Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"bg-black flex h-screen overflow-hidden"}>
        <Sidebar />
        <Main />
      </main>
      <div>
        <Player />
      </div>
    </div>
  );
};

export default Home;
