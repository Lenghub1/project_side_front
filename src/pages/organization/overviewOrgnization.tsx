import { useState, useEffect } from "react";
import CP from "@/components";
import theme from "@/theme/ligthTheme";

import { BranchDetailCard } from "./branchDetail"; // Importing the BranchDetailCard component
import Container from "@mui/material/Container"; // Import Container from Material-UI

const OverviewOrganization = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 456);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 456);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <Container maxWidth="lg">
      <CP.Styled.Wrapper padding="20px" overflow="auto" width="auto">
        <CP.Styled.Div>
          <CP.Styled.Flex direction="column" gap="10px">
            <CP.Card
              padding="0"
              border="none"
              borderBottom="0.5px solid"
              borderRadius="none"
            >
              <CP.Styled.Flex gap={isMobile ? "20px" : "50px"}>
                <CP.Button
                  variant="text"
                  sx={{
                    padding: "10px",
                    color: `${theme.palette.primary}`,
                    borderBottom: "2px solid",
                    borderRadius: "0"
                  }}
                >
                  OVERVIEW
                </CP.Button>
                <CP.Button
                  variant="text"
                  sx={{
                    padding: "10px",
                    color: `${theme.palette.text.secondary}`
                  }}
                >
                  PERMISSION
                </CP.Button>
                <CP.Button
                  variant="text"
                  sx={{
                    padding: "10px",
                    color: `${theme.palette.text.secondary}`
                  }}
                >
                  ADVANCES
                </CP.Button>
              </CP.Styled.Flex>
            </CP.Card>
            <CP.Styled.Div>
              <CP.Styled.Flex direction="column" items="flex-start" gap="10px">
                <CP.Typography sx={{ marginTop: "20px" }} variant="h6">
                  Detail
                </CP.Typography>
                <CP.Card border="none">
                  <CP.Styled.Flex direction="column" gap="10px">
                    <CP.Styled.Flex
                      direction="column"
                      items="flex-start"
                      style={{ borderBottom: "0.5px solid" }}
                    >
                      <CP.Typography>Name</CP.Typography>
                      <CP.Typography variant="subtitle1">Sandbox</CP.Typography>
                    </CP.Styled.Flex>
                    <CP.Styled.Flex
                      direction="column"
                      items="flex-start"
                      style={{ borderBottom: "0.5px solid" }}
                    >
                      <CP.Typography>Number of Employee</CP.Typography>
                      <CP.Typography variant="subtitle1">56</CP.Typography>
                    </CP.Styled.Flex>
                    <CP.Styled.Flex
                      direction="column"
                      items="flex-start"
                      style={{ borderBottom: "0.5px solid" }}
                    >
                      <CP.Typography>Currency</CP.Typography>
                      <CP.Typography variant="subtitle1">Riel</CP.Typography>
                    </CP.Styled.Flex>
                    <CP.Styled.Flex
                      direction="column"
                      items="flex-start"
                      style={{ borderBottom: "0.5px solid" }}
                    >
                      <CP.Typography>Location</CP.Typography>
                      <CP.Typography variant="subtitle1">
                        abc, 123, Phnom Penh, Cambodia
                      </CP.Typography>
                    </CP.Styled.Flex>
                  </CP.Styled.Flex>
                </CP.Card>
              </CP.Styled.Flex>
            </CP.Styled.Div>
            <CP.Styled.Div>
              <CP.Styled.Flex direction="column" items="flex-start" gap="10px">
                <CP.Styled.Flex
                  items="center"
                  justify="space-between"
                  margin="10px 0"
                >
                  <CP.Typography sx={{ textAlign: "center" }} variant="h6">
                    BRANCHES(2)
                  </CP.Typography>
                  <CP.Button>Create</CP.Button>
                </CP.Styled.Flex>

                <CP.Card border="none">
                  <CP.Styled.Flex direction="column">
                    <BranchDetailCard branchName="Branch1" />
                    <BranchDetailCard branchName="Branch2" />
                  </CP.Styled.Flex>
                </CP.Card>
              </CP.Styled.Flex>
            </CP.Styled.Div>
          </CP.Styled.Flex>
        </CP.Styled.Div>
      </CP.Styled.Wrapper>
    </Container>
  );
};

export default OverviewOrganization;
