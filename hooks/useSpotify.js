import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";

export const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    if (session?.error === "RefreshAccessTokenError") {
      signIn().catch(console.log);
    }

    spotifyApi.setAccessToken(session.user.accessToken);
  }, [session]);

  return spotifyApi;
};
