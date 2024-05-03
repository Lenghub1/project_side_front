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
import { employeeId, employeeInfo } from "@/store/employee";
import { myOrganization } from "@/api/organization";
import { handleApiRequest } from "@/api";
import Loading from "@/components/loading/Loading";
import { getEmployeeById } from "@/api/employee";
import { connectWithSocketServer } from "@/socket/socketConnection";
const HomePage = () => {
  const {
    response: data,
    isSuccess,
    isError,
    error,
    handleApiRequest: apiHook,
    isLoading,
  } = useApi();
  const [organizationData, setOrganizationData] = useRecoilState(organization);
  const [employeeData, setEmployeeData] = useRecoilState(employeeInfo);
  const selected = useRecoilValue(selectedOrganization);
  const employeedId = useRecoilValue(employeeId);
  const user = useRecoilValue(userState);

  if (user.firstName === null || user.lastName === null) {
    return <Navigate to={"/fillForm"} replace />;
  }
  if (!selected) {
    return <Navigate to={"/login/choose-organization"} replace />;
  }
  const myOrganizationData = async () => {
    await apiHook(() => myOrganization(selected));
  };
  const myEmployeeData = async () => {
    const [response, error] = await handleApiRequest(() =>
      getEmployeeById(employeedId, selected)
    );

    if (response) {
      setEmployeeData(response as any);
    }
  };
  React.useEffect(() => {
    if (isSuccess) {
      setOrganizationData(data);
      const dataDetail = { user, data };
      connectWithSocketServer(dataDetail);
    }
  }, [isSuccess, isError, error]);

  React.useEffect(() => {
    myOrganizationData();
    myEmployeeData();
  }, []);

  if (isError && error) {
    localStorage.removeItem("recoil-persist");
    return <Error status={error.statusCode!} message={error.message!} />;
  }

  if (employeeData?.status === "pending") {
    return <Navigate to={"/check-status"} replace />;
  }

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper overflow="auto">
        <Outlet />
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
