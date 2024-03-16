import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, persistLoginState } from "@/store/userStore";
import { refreshAccessToken } from "@/utils/authUtils";

function usePersistLogin() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const setPersistLogin = useSetRecoilState(persistLoginState);
  const effectRan = useRef(false);

  useEffect(() => {
    if (
      effectRan.current === true ||
      import.meta.env.VITE_NODE_ENV !== "development"
    ) {
      const verifyRefreshToken = async () => {
        await refreshAccessToken(setAccessToken);
        setPersistLogin(true);
      };

      if (!accessToken) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
      return;
    };
  }, [accessToken, setAccessToken]);
}

export default usePersistLogin;
