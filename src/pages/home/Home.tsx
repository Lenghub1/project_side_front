import { useRecoilValue } from "recoil";
import CP from "@/components";
import Store from "@/store";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const user = useRecoilValue(Store.User.userState);
  console.log(user);

  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper>
        <Outlet />
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
