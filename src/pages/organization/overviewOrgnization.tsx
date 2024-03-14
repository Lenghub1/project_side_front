import { useState, useEffect } from "react";
import CP from "@/components";
import theme from "@/theme/ligthTheme";
import { handleApiRequest } from "@/api";
import { getAllPendingEmployees } from "@/api/employee";
import { BranchDetailCard } from "./branchDetail"; // Importing the BranchDetailCard component
import Container from "@mui/material/Container"; // Import Container from Material-UI
import styled from "styled-components";
import { Divider } from "@mui/material";
import { my_organization } from "@/api/organization";
import React from "react";
const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const OverviewOrganization = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 456);
  const [organizationData, setOrganizationData] = useState({}) as any;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 456);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const my_organization_data = async () => {
    const [response, error] = await handleApiRequest(() =>
      my_organization("1ca2a528-72c9-4cb8-8823-4d26cfcdd598")
    );
    if (response) {
      setOrganizationData(response.data);
    } else {
      console.log(error);
    }
  };

  React.useEffect(() => {
    my_organization_data();
  }, []);
  return (
    <Container maxWidth="lg">
      <CP.Styled.Wrapper padding="20px" overflow="auto" width="auto">
        <Flex direction="column" gap="10px">
          <CP.Card padding="0" width="100%">
            <CP.Styled.Flex gap={isMobile ? "20px" : "50px"}>
              <CP.Button
                variant="text"
                sx={{
                  padding: "10px",
                  color: `${theme.palette.primary}`,
                  borderBottom: "2px solid",
                  borderRadius: "0",
                }}
              >
                OVERVIEW
              </CP.Button>
              <CP.Button
                variant="text"
                sx={{
                  padding: "10px",
                  color: `${theme.palette.text.secondary}`,
                }}
              >
                PERMISSION
              </CP.Button>
              <CP.Button
                variant="text"
                sx={{
                  padding: "10px",
                  color: `${theme.palette.text.secondary}`,
                }}
              >
                ADVANCES
              </CP.Button>
            </CP.Styled.Flex>
          </CP.Card>

          <Flex
            direction="column"
            items="flex-start"
            gap="10px"
            overflow="unset"
          >
            <CP.Typography sx={{ marginTop: "20px" }} variant="h6">
              Detail
            </CP.Typography>
            <CP.Card width="100%">
              <CP.Styled.Flex direction="column" gap="10px">
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Name</CP.Typography>
                  <CP.Typography variant="subtitle1">
                    {organizationData.name}
                  </CP.Typography>
                </CP.Styled.Flex>
                <Divider sx={{ width: "100%" }} />
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Number of Employee</CP.Typography>
                  <CP.Typography variant="subtitle1">
                    {organizationData.employeeCounts}
                  </CP.Typography>
                </CP.Styled.Flex>
                <Divider sx={{ width: "100%" }} />
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Currency</CP.Typography>
                  <CP.Typography variant="subtitle1">Riel</CP.Typography>
                </CP.Styled.Flex>
                <Divider sx={{ width: "100%" }} />
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Location</CP.Typography>
                  <CP.Typography variant="subtitle1">
                    abc, 123, Phnom Penh, Cambodia
                  </CP.Typography>
                </CP.Styled.Flex>
              </CP.Styled.Flex>
            </CP.Card>
          </Flex>

          <Flex direction="column" items="flex-start" gap="10px">
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

            <Flex direction="column" gap="20px">
              <BranchDetailCard branchName="Branch1" />
              <BranchDetailCard branchName="Branch2" />
            </Flex>
          </Flex>
        </Flex>
      </CP.Styled.Wrapper>
    </Container>
  );
};

export default OverviewOrganization;
