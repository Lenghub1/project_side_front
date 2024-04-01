import CP from "@/components";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import { Outlet } from "react-router-dom";
import { selectedOrganization } from "@/store/userStore";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userStore";

const HomePage = () => {
  const selected = useRecoilValue(selectedOrganization);
  const user = useRecoilValue(userState);
  if (user.firstName === null || !user.lastName === null) {
    return <Navigate to={"/fillForm"} replace />;
  }
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
