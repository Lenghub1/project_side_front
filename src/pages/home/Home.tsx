import CP from "@/components";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import { Outlet } from "react-router-dom";
import { selectedOrganization } from "@/store/userStore";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const selected = useRecoilValue(selectedOrganization);
  if (!selected) {
    return <Navigate to={"/login/choose-organization"} replace />;
  }
  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper>
        <Outlet />
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
