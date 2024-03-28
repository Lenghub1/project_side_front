import CP from "@/components";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper>
        <Outlet />
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
