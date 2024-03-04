import Store from "@/store";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

import CP from "@/components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Sidebar from "./sidebar";

const CustomLayout = () => {
  const [isSidebar, setIsSidebar] = useRecoilState(Store.Layout.sidebarState);

  const [loginUser, setLoginUser] = useRecoilState(Store.User.loginUserState);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setIsSidebar(false);
    };
  }, []);

  return (
    <div style={{ height: "inherit", width: "inherit" }}>
      <Outlet />
      <CP.Popover open={isSidebar} onClose={() => setIsSidebar(false)}>
        {loginUser?.auth && loginUser.auth === "owner" ? (
          <Sidebar.OwnerSidebar />
        ) : (
          <Sidebar.EmpSidebar />
        )}
      </CP.Popover>
    </div>
  );
};

export default CustomLayout;
