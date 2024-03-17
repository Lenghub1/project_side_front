import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, isAccessTokenFetchedState } from "@/store/userStore";
import { refreshAccessToken } from "@/utils/authUtils";

function useEnsureAccessToken() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const setIsAccessTokenFetched = useSetRecoilState(isAccessTokenFetchedState);
  const effectRan = useRef(false);

  useEffect(() => {
    if (
      effectRan.current === true ||
      import.meta.env.VITE_NODE_ENV !== "development"
    ) {
      const verifyRefreshToken = async () => {
        await refreshAccessToken(setAccessToken);
        setIsAccessTokenFetched(true);
      };

      if (!accessToken) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
      return;
    };
  }, [accessToken, setAccessToken]);
}

export default useEnsureAccessToken;
