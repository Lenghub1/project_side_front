import CP from "@/components";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import { Outlet } from "react-router-dom";
import { selectedOrganization } from "@/store/userStore";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userStore";
import React from "react";
import { Error } from "@/pages/error";
import useApi from "@/hooks/useApi";
import { organization } from "@/store/organizationStore";
import { useRecoilState } from "recoil";
import { selectEmployeeData } from "@/store/employee";
import { myOrganization } from "@/api/organization";

const HomePage = () => {
  const {
    response: data,
    isSuccess,
    isError,
    error,
    handleApiRequest: apiHook,
  } = useApi();
  const [organizationData, setOrganizationData] = useRecoilState(organization);
  const selected = useRecoilValue(selectedOrganization);
  const employeeData = useRecoilValue(selectEmployeeData);
  const user = useRecoilValue(userState);
  if (user.firstName === null || !user.lastName === null) {
    return <Navigate to={"/fillForm"} replace />;
  }
  if (!selected) {
    return <Navigate to={"/login/choose-organization"} replace />;
  }
  const myOrganizationData = async () => {
    await apiHook(() => myOrganization(selected));
  };
  React.useEffect(() => {
    if (isSuccess) {
      setOrganizationData(data);
    }
  }, [isSuccess, isError, error]);

  React.useEffect(() => {
    myOrganizationData();
  }, []);

  if (isError && error) {
    console.log("hello", isError, error.statusCode);
    localStorage.removeItem("recoil-persist");
    return <Error status={error.statusCode!} message={error.message!} />;
  }
  console.log(organizationData?.status);

  if (employeeData?.status === "pending") {
    return <Navigate to={"/check-status"} replace />;
  }
  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper overflow="scroll">
        <Outlet />
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
