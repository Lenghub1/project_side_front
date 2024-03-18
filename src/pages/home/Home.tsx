import { useRecoilValue, useSetRecoilState } from "recoil";

import CP from "@/components";
import Store from "@/store";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
const HomePage = () => {
  const campus = useRecoilValue(Store.User.campusState);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper overflow="auto">
        {isHomePage ? (
          <>
            <h2>Body</h2>
            <h4>Main</h4>
            <h5>
              campus name : {campus && campus.name ? campus.name : "none"}
            </h5>
          </>
        ) : (
          <Outlet />
        )}
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
