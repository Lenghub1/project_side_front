import CP from "@/components";
import TypeCard from "@/components/organization/organizationCard";
import { Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ScreenChooseOrganization = () => {
  const navigate = useNavigate();
  const [typeSelected, setTypeSelected] = useState<"Join" | "Create">("Join");
  const handleNextClick = () => {
    if (typeSelected === "Join") {
      navigate("/join-organization"); // Navigate to ScreenJoinOrganization
    } else {
      navigate("/create-organization");
    }
  };
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        minHeight: "100vh",
      }}
    >
      <CP.Styled.Flex gap="2rem">
        <TypeCard
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
          image="https://web.jibble.io/img/signup-type-1.7657a54a.svg"
          title="Join"
          description="Description for Join type"
        />
        <TypeCard
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
          image="https://web.jibble.io/img/signup-type-1.7657a54a.svg"
          title="Create"
          description="Description for Create type"
        />
      </CP.Styled.Flex>
      <CP.Button onClick={handleNextClick} style={{ width: "58%" }}>
        {" "}
        NEXT
      </CP.Button>
    </Container>
  );
};

export default ScreenChooseOrganization;
