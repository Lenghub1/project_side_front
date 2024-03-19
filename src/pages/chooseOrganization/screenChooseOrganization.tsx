import CP from "@/components";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { allWorkplace } from "@/api/employee";
import { handleApiRequest } from "@/api";
import ChooseOrganizationCard from "@/components/organization/chooseOrganizationCard";
import { userState, selectOrganization } from "@/store/userStore"; // Renamed selectOrganization to selectedOrg
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { organizationState } from "@/store/organizationStore";

const ScreenChooseOrganization = () => {
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useRecoilState(selectOrganization); // Renamed selectOrganization to selectedOrg
  const [organizationData, setOrganizationData] =
    useRecoilState(organizationState);
  const user = useRecoilValue(userState);
  console.log(user);

  const organizations = async () => {
    const [response, error] = await handleApiRequest(() =>
      allWorkplace(user.id)
    );
    if (response) {
      setOrganizationData(response.data || []);
    } else {
      console.log(error);
    }
  };
  console.log(organizationData);
  const findOrgIdBySelectedId = (selectedId: string) => {
    const selectedOrganization = organizationData.find(
      (org: any) => org.id === selectedId
    );
    if (selectedOrganization) {
      setSelectedOrg(selectedOrganization.orgId);
      return selectedOrganization.orgId;
    } else {
      console.error("Selected organization not found in organizationData");
      return null;
    }
  };
  const handleNavigate = () => {
    findOrgIdBySelectedId(selectedOrg);
    navigate("/");
  };

  console.log(selectedOrg);

  useEffect(() => {
    organizations();
  }, []);

  return (
    <CP.Styled.Flex>
      <CP.Styled.Flex direction="column" gap="20px" padding="20px">
        <CP.Styled.Flex direction="column">
          <CP.Styled.Flex
            direction="column"
            style={{ position: "absolute", top: "5%" }}
          >
            <CP.Typography variant="h5">Riem</CP.Typography>
            <CP.Typography>
              Confirmed as <strong>{user.email}</strong>
            </CP.Typography>
          </CP.Styled.Flex>
        </CP.Styled.Flex>
        <CP.Styled.Flex direction="column">
          <CP.Typography variant="h4">CHOOSE</CP.Typography>
          <CP.Typography variant="h4"> YOUR ORGANIZATIONS </CP.Typography>
        </CP.Styled.Flex>

        {organizationData.map((organization: any, index: number) => (
          <ChooseOrganizationCard
            key={index}
            id={organization.id}
            setActiveOrgId={setSelectedOrg} // Updated to use setSelectedOrg instead of setSelectOrganization
            isActive={organization.id === selectedOrg} // Updated to use selectedOrg instead of selectOrganization
            title={organization.organizations.name}
            description="You are member of ours organization , pls click Next to Login"
          />
        ))}

        <CP.Typography style={{ marginTop: "40px" }}>
          By continuing, you’re agreeing to our Main Services Agreement, User
          Terms of Service, and Riem Supplemental Terms. Additional disclosures
          are available in our Privacy Policy and Cookie Policy.
        </CP.Typography>
        <CP.Styled.Flex
          gap="20px"
          justify="flex-end"
          style={{ marginTop: "20px" }}
        >
          <CP.Button variant="outlined">CANCEL</CP.Button>
          {selectedOrg ? (
            <CP.Button onClick={handleNavigate}>NEXT</CP.Button>
          ) : (
            <CP.Button disabled>NEXT</CP.Button>
          )}
        </CP.Styled.Flex>
      </CP.Styled.Flex>

      <CP.Styled.Div>
        <Box
          component="img"
          src="/random-unsplash.jpg"
          alt="Random image"
          sx={{
            width: 1,
            height: "100vh",
            objectFit: "cover",
          }}
        ></Box>
      </CP.Styled.Div>
    </CP.Styled.Flex>
  );
};

export default ScreenChooseOrganization;
