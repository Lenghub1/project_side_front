import CP from "@/components";
import { useState, useEffect } from "react";
import React from "react";
import Box from "@mui/material/Box";
import { allWorkplace } from "@/api/employee";
import { handleApiRequest } from "@/api";
// Import the RoleCard component
import OrganizationCard from "@/components/companyCard/organizationCard";

const ScreenChooseOrganization = () => {
  // State to track the active organization ID
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);
  const [organizationData, setOrganizationData] = useState<string[]>([]);

  const newPendingEmployees = async () => {
    const [response, error] = await handleApiRequest(() =>
      allWorkplace("6d42b6ca-edc2-4c9a-a797-6e83e7cd9a1d")
    );
    if (response) {
      setOrganizationData(response.data || []); // Ensure response.data is an array or default to empty array
      console.log(response);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    newPendingEmployees();
  }, []); // Run once on component mount

  return (
    <CP.Styled.Flex>
      <CP.Styled.Flex direction="column" gap="20px" padding="20px">
        {/* Your existing content */}
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

        {/* Render OrganizationCard for each organization */}
        {organizationData.map((organization) => (
          <OrganizationCard
            key={organization.id}
            id={organization.id}
            activeId={activeOrgId}
            setActiveId={setActiveOrgId}
            image={organization.image}
            title={organization.title}
            description={organization.description}
          />
        ))}

        {/* Your existing content */}
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
