import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import usePersist from "@/hooks/usePersist";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/store/userStore";
import { refreshAccessToken } from "@/utils/authUtils";

function PersistLogin() {
  const [persist] = usePersist();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    if (
      effectRan.current === true ||
      import.meta.env.VITE_NODE_ENV !== "development"
    ) {
      const verifyRefreshToken = async () => {
        await refreshAccessToken(setAccessToken);
        setTrueSuccess(true);
      };

      if (!accessToken && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    console.log("No persist!");
    content = <Outlet />;
  } else if (trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (accessToken) {
    content = <Outlet />;
  }
  return content;
}

export default PersistLogin;
