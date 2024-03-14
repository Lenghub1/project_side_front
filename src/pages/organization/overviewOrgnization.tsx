import { useState, useEffect } from "react";
import CP from "@/components";
import theme from "@/theme/ligthTheme";
import { handleApiRequest } from "@/api";
import { my_branch } from "@/api/branch";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { Divider } from "@mui/material";
import { my_organization } from "@/api/organization";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BranchDetailCard } from "./branchDetail";
const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const OverviewOrganization = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 456);
  const [organizationData, setOrganizationData] = useState({}) as any;
  const [organizationBranchData, setOrganizationBranchData] = useState(
    []
  ) as any;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 456);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const createBranch = () => {
    navigate("/organization/createBranch");
  };
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

  const my_organization_branch_data = async () => {
    const [response, error] = await handleApiRequest(() =>
      my_branch("1ca2a528-72c9-4cb8-8823-4d26cfcdd598")
    );
    console.log(response);

    if (response) {
      setOrganizationBranchData(response.data.data);
    } else {
      console.log(error);
    }
  };

  React.useEffect(() => {
    my_organization_data();
    my_organization_branch_data();
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
                BRANCHES({organizationBranchData.length})
              </CP.Typography>
              <CP.Button onClick={createBranch}>Create</CP.Button>
            </CP.Styled.Flex>

            <Flex direction="column" gap="20px">
              {Array.isArray(organizationBranchData) &&
                organizationBranchData.map((branch: any, index: number) => (
                  <BranchDetailCard key={index} branchData={branch} />
                ))}
            </Flex>
          </Flex>
        </Flex>
      </CP.Styled.Wrapper>
    </Container>
  );
};

export default OverviewOrganization;
