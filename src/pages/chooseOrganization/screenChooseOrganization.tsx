import CP from "@/components";
import TypeCard from "@/components/organization/organizationCard";
import { Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ScreenChooseOrganization = () => {
  const navigate = useNavigate();
  const [typeSelected, setTypeSelected] = useState<"Join" | "Create" | null>(
    null
  );
  const handleNextClick = () => {
    console.log("Selected Type:", typeSelected);
    if (typeSelected === "Join") {
      navigate("/join-organization");
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
          description="If you want to join exist Organization you can click me"
        />
        <TypeCard
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
          image="https://web.jibble.io/img/signup-type-1.7657a54a.svg"
          title="Create"
          description="If you want to create Organization you can click me"
        />
      </CP.Styled.Flex>

      <CP.Button
        onClick={handleNextClick}
        style={{ width: "62%" }}
        disabled={typeSelected === null}
      >
        NEXT
      </CP.Button>
    </Container>
  );
};

export default ScreenChooseOrganization;
