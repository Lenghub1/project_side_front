import CP from "@/components";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { allWorkplace } from "@/api/employee";
import { handleApiRequest } from "@/api";
import ChooseOrganizationCard from "@/components/organization/chooseOrganizationCard";

const ScreenChooseOrganization = () => {
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);
  const [organizationData, setOrganizationData] = useState<any[]>([]);

  const newPendingEmployees = async () => {
    const [response, error] = await handleApiRequest(() =>
      allWorkplace("fa6f8c4b-e5fd-4c23-a20c-edbab2b5d169")
    );
    if (response) {
      setOrganizationData(response.data || []);
    } else {
      console.log(error);
    }
  };
  console.log(activeOrgId);

  useEffect(() => {
    newPendingEmployees();
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
              Confirmed as <strong>TourlengStrange@gmail.com</strong>
            </CP.Typography>
          </CP.Styled.Flex>
        </CP.Styled.Flex>
        <CP.Styled.Flex direction="column">
          <CP.Typography variant="h4">CHOOSE</CP.Typography>
          <CP.Typography variant="h4"> YOUR ORGANIZATIONS </CP.Typography>
        </CP.Styled.Flex>

        {organizationData.map((organization, index) => (
          <ChooseOrganizationCard
            key={index}
            id={organization.id}
            setActiveOrgId={setActiveOrgId}
            isActive={organization.id === activeOrgId}
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
          <CP.Button>NEXT</CP.Button>
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
