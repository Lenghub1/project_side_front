import Store from "@/store";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Auth = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(Store.User.loginUserState);

  useEffect(() => {
    if (!isLogin) navigate("/test-login");
    if (isLogin) navigate("/");
  }, [isLogin]);

  return <>{children}</>;
};

export default Auth;
