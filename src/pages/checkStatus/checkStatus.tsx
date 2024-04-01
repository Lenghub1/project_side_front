import { Container } from "@mui/material";
import { selectedOrganization } from "@/store/userStore";
import CP from "@/components";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

const CheckStatus = () => {
  const selected = useRecoilValue(selectedOrganization);
  if (!selected) {
    return <Navigate to={"/login/choose-organization"} replace />;
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
