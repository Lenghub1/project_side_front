import { useState, useEffect } from "react";
import CP from "@/components";
import theme from "@/theme/ligthTheme";
import { handleApiRequest } from "@/api";
import { myBranch } from "@/api/branch";
import styled from "styled-components";
import { Divider } from "@mui/material";
import { organization } from "@/store/organizationStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BranchDetailCard } from "../../branch/branchDetail";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { selectedOrganization } from "@/store/userStore";
import { useRecoilValue } from "recoil";

import useScreenSize from "@/hooks/useScreenSize";
const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const OverviewOrganization = () => {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();
  const location = useLocation();

  const organizationData = useRecoilValue(organization) as any;
  const selected = useRecoilValue(selectedOrganization);
  const [organizationBranchData, setOrganizationBranchData] = useState(
    []
  ) as any;
  const isViewOrganization = location.pathname === "/organization";

  const createBranch = () => {
    navigate("/organization/createBranch");
  };

  const myOrganizationBranchData = async () => {
    const [response, error] = await handleApiRequest(() => myBranch(selected));

    if (response) {
      setOrganizationBranchData(response.data);
    } else {
    }
  };

  React.useEffect(() => {
    myOrganizationBranchData();
  }, []);

  return (
    <CP.Styled.Wrapper overflow="auto">
      {isViewOrganization ? (
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
                    {organizationData?.name}
                  </CP.Typography>
                </CP.Styled.Flex>
                <Divider sx={{ width: "100%" }} />
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Number of Employee</CP.Typography>
                  <CP.Typography variant="subtitle1">
                    {organizationData?.employeeCounts}
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
                BRANCHES({organizationBranchData?.length})
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
      ) : (
        <Outlet />
      )}
    </CP.Styled.Wrapper>
  );
};

export default OverviewOrganization;
