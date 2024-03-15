import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState, persistLoginState } from "@/store/userStore";
import { refreshAccessToken } from "@/utils/authUtils";

function usePersistLogin() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [persistLogin, setPersistLogin] = useRecoilState(persistLoginState);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refreshAccessToken(setAccessToken);
      setPersistLogin(true);
    };

    if (!accessToken) verifyRefreshToken();
  }, [accessToken, setAccessToken]);
}

export default usePersistLogin;
