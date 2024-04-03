import { Container } from "@mui/material";
import { employeeId } from "@/store/employee";
import { selectedOrganization } from "@/store/userStore";
import CP from "@/components";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

import { getEmployeeById } from "@/api/employee";
import { Error } from "@/pages/error";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Loading from "@/components/loading/Loading";
const CheckStatus = () => {
  const { response, isLoading, isSuccess, isError, error, handleApiRequest } =
    useApi();

  const selected = useRecoilValue(selectedOrganization);
  const employeeData = useRecoilValue(employeeId);
  const [employee, setEmployee] = useState<any>();
  if (!selected) {
    return <Navigate to={"/login/choose-organization"} replace />;
  }
  const employeeStatus = async () => {
    await handleApiRequest(() => getEmployeeById(employeeData, selected));
  };
  useEffect(() => {
    employeeStatus();
  }, []);

  useEffect(() => {
    if (response) {
      setEmployee(response);
    }
  }, [isSuccess, response]);

  if (isError && error) {
    return <Error status={error.statusCode!} message={error.message!} />;
  }
  if (employee?.status === "active") {
    return <Navigate to={"/"} replace />;
  }

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        maxWidth: "768px",
      }}
    >
      <CP.Styled.Flex direction="column" gap="20px" overflow="auto">
        <CP.Typography variant="h5">Pending Approval</CP.Typography>
        <CP.Typography maxWidth={"500px"}>
          Thank you for requesting to join EMCAST! Your request is currently
          under review. We appreciate your patience and will notify you at the
          contact information you provided once a decision has been made.
        </CP.Typography>
        <img
          style={{ width: "300px", height: "300px" }}
          src="/waiting.svg"
        ></img>
        <CP.Styled.Flex gap="20px">
          <CP.Button variant="text">Cancel Request</CP.Button>
          <CP.Button>HomePage</CP.Button>
        </CP.Styled.Flex>
      </CP.Styled.Flex>
    </Container>
  );
};

export default CheckStatus;
