import Store from "@/store";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";

const Auth = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(Store.User.loginUserState);
  const isCampus = useRecoilValue(Store.User.campusState);

  useEffect(() => {
    // login campus router flow
    if (!isCampus) return navigate("/campus");
    if (!isLogin && isCampus) navigate("/login");
    // if (isLogin && isCampus) navigate("/");
  }, [isLogin, isCampus]);

  return <>{children}</>;
};

export default Auth;
