import CP from "@/components";
import TypeCard from "@/components/organization/organizationCard";
import { Flex } from "../getStarted/GetStarted";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/utils/isMobile";
import { ScrollableWrapper } from "@/components/spaWithImage/SpaWithImage";
const ScreenChooseOrganization = () => {
  const navigate = useNavigate();
  const [typeSelected, setTypeSelected] = useState<"Join" | "Create" | null>(
    null
  );
  const isMobile = useIsMobile();
  const handleNextClick = () => {
    if (typeSelected === "Join") {
      navigate("/join-organization");
    } else {
      navigate("/create-organization");
    }
  };

  return (
    <ScrollableWrapper>
      <Flex direction="column" padding="0 0 2rem">
        <CP.Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
          Do you want to join or create ?
        </CP.Typography>
        <CP.Typography variant="subtitle1">Choose one</CP.Typography>
      </Flex>
      <Flex direction="column" gap="2rem" padding="auto">
        <Flex
          direction={isMobile ? "column" : "row"}
          gap="2rem"
          padding="0 1rem"
        >
          <TypeCard
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
            image="./join.svg"
            title="Join"
            description="If you want to join exist Organization you can click me"
          />
          <TypeCard
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
            image="./create.svg"
            title="Create"
            description="If you want to create Organization you can click me"
          />
        </Flex>

        <Flex padding="0 1rem">
          <CP.Button
            fullWidth
            style={{ maxWidth: 712 }}
            onClick={handleNextClick}
            disabled={typeSelected === null}
          >
            NEXT
          </CP.Button>
        </Flex>
      </Flex>
    </ScrollableWrapper>
  );
};

export default ScreenChooseOrganization;
