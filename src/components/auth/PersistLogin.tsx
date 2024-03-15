import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import usePersist from "@/hooks/usePersist";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/store/userStore";
import { refreshAccessToken } from "@/utils/authUtils";

function PersistLogin() {
  const [persist] = usePersist();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const effectRan = useRef(false);

  // const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    if (
      effectRan.current === true ||
      import.meta.env.VITE_NODE_ENV !== "development"
    ) {
      const verifyRefreshToken = async () => {
        await refreshAccessToken(setAccessToken);
        // setTrueSuccess(true);
      };

      // if (!accessToken && persist) verifyRefreshToken();
      if (!accessToken) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
      return;
    };
  }, []);

  if (!persist) {
    return <Outlet />;
  }

  return <Outlet />;
}

export default PersistLogin;
