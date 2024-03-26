import Store from "@/store";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";

const Auth = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(Store.User.loginUserState);

  useEffect(() => {
    if (!isLogin) navigate("/login");
    if (isLogin) navigate("/");
  }, [isLogin]);

  return <>{children}</>;
};

export default Auth;
