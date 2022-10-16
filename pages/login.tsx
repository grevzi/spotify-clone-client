import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";
import Spotify from "../public/spotify.svg";

interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <div className=" ">
      <Head>
        <title>Login | Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={
          "bg-black flex items-center justify-center min-h-screen overflow-hidden text-gray-500"
        }
      >
        {Object.values(providers!).map((provider, index) => (
          <div key={index} className={"text-center"}>
            <div className={"w-48 h-48 mb-5 relative"}>
              <Image src={Spotify} alt="spotify logo" layout={"fill"} />
            </div>
            <button
              className={"bg-[#1cd760] text-white p-3 rounded"}
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      test: "asd",
      providers,
    },
  };
};
