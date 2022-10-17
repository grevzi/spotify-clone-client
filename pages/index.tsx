import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Main from "../components/Main";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const Home: NextPage = () => {
  return (
    <div className=" ">
      <Head>
        <title>Home | Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={"bg-black h-screen overflow-hidden"}>
        <main className={"flex"}>
          <Sidebar />
          <Main />
        </main>
        <div className={"sticky bottom-0"}>
          <Player />
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
