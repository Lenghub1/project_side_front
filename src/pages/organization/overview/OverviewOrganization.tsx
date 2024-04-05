import { useState, useEffect } from "react";
import CP from "@/components";
import { handleApiRequest } from "@/api";
import { myBranch } from "@/api/branch";
import { Divider } from "@mui/material";
import { organization } from "@/store/organizationStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BranchDetailCard } from "../../branch/branchDetail";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { selectedOrganization } from "@/store/userStore";
import { useRecoilValue } from "recoil";
import useApi from "@/hooks/useApi";
import Loading from "@/components/loading/Loading";
const OverviewOrganization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { response, isLoading, isSuccess, isError, error, handleApiRequest } =
    useApi();
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
    await handleApiRequest(() => myBranch(selected));
  };
  useEffect(() => {
    if (response) {
      setOrganizationBranchData(response.data);
    }
  }, [isSuccess, response]);
  React.useEffect(() => {
    myOrganizationBranchData();
  }, [location]);
  if (isLoading) {
    <Loading isLoading={isLoading} />;
  }
  return (
    <>
      {isViewOrganization ? (
        <CP.Styled.Flex direction="column" gap="10px">
          <CP.Styled.Flex
            direction="column"
            items="flex-start"
            gap="10px"
            style={{ paddingBottom: "16px" }}
          >
            <CP.Typography sx={{ marginTop: "20px" }} variant="h6">
              Detail
            </CP.Typography>
            <CP.Card width="100%">
              <CP.Styled.Flex direction="column" gap="10px">
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Name</CP.Typography>
                  <CP.Typography variant="subtitle1">
                    <strong>{organizationData?.name}</strong>
                  </CP.Typography>
                </CP.Styled.Flex>
                <Divider sx={{ width: "100%" }} />
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Number of Employee</CP.Typography>
                  <CP.Typography variant="subtitle1">
                    <strong>{organizationData?.employeeCounts}</strong>
                  </CP.Typography>
                </CP.Styled.Flex>
                <Divider sx={{ width: "100%" }} />
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Currency</CP.Typography>
                  <CP.Typography variant="subtitle1">
                    <strong>Riel</strong>
                  </CP.Typography>
                </CP.Styled.Flex>
                <Divider sx={{ width: "100%" }} />
                <CP.Styled.Flex direction="column" items="flex-start">
                  <CP.Typography>Company Code</CP.Typography>
                  <CP.Typography variant="body1" color="accent">
                    <strong>{organizationData?.code}</strong>
                  </CP.Typography>
                </CP.Styled.Flex>
              </CP.Styled.Flex>
            </CP.Card>
          </CP.Styled.Flex>

          <CP.Styled.Flex
            direction="column"
            items="flex-start"
            gap="10px"
            height="100%"
            padding="16px 0"
          >
            <CP.Styled.Flex items="center" justify="space-between">
              <CP.Typography sx={{ textAlign: "center" }} variant="h6">
                BRANCHES({organizationBranchData?.length})
              </CP.Typography>
              <CP.Button onClick={createBranch}>Create</CP.Button>
            </CP.Styled.Flex>

            <CP.Styled.Flex
              direction="column"
              gap="16px"
              height="100%"
              style={{ paddingBottom: "50px" }}
            >
              {Array.isArray(organizationBranchData) &&
                organizationBranchData.map((branch: any, index: number) => (
                  <BranchDetailCard key={index} branchData={branch} />
                ))}
            </CP.Styled.Flex>
          </CP.Styled.Flex>
        </CP.Styled.Flex>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default OverviewOrganization;
