import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";
import Spotify from "../public/spotify.svg";
import { FormEvent } from "react";

interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log({ data });

    await signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });
  };
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
        {Object.values(providers!).map((provider, index) => {
          if (provider.id === "credentials") {
            return (
              <form
                key={index}
                action="/api/auth/login/"
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="type your email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="type your password"
                  required
                />
                <button
                  type="submit"
                  className={"bg-[#1cd760] text-white p-3 rounded"}
                >
                  Login with {provider.name}
                </button>
              </form>
            );
          }

          return (
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
          );
        })}
      </main>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
