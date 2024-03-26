<<<<<<< HEAD
import { useRecoilValue } from "recoil";
=======
>>>>>>> develop
import CP from "@/components";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import { Outlet } from "react-router-dom";

const HomePage = () => {
<<<<<<< HEAD
  const user = useRecoilValue(Store.User.userState);
  console.log(user);

  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper>
        <Outlet />
=======
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper overflow="auto">
        {isHomePage ? (
          <>
            <h2>Body</h2>
            <h4>Main</h4>
          </>
        ) : (
          <Outlet />
        )}
>>>>>>> develop
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
