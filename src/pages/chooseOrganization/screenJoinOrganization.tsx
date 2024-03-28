import CP from "@/components";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { allWorkplace } from "@/api/employee";
import { handleApiRequest } from "@/api";
import ChooseOrganizationCard from "@/components/organization/chooseOrganizationCard";
import { userState, selectedOrganization } from "@/store/userStore"; // Renamed selectOrganization to selectedOrg
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { organizationState } from "@/store/organizationStore";
import { Splide, SplideSlide } from "@splidejs/react-splide"; // Import Splide components
import "@splidejs/splide/dist/css/themes/splide-default.min.css"; // Import Splide CSS

const ScreenJoinOrganization = () => {
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useState<string>();
  const [selectOrg, setSelectOrg] = useRecoilState(selectedOrganization);
  const [organizationData, setOrganizationData] =
    useRecoilState(organizationState);
  const user = useRecoilValue(userState);

  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching new data
      const [response, error] = await handleApiRequest(() =>
        allWorkplace(user.id)
      );

      if (response) {
        setOrganizationData(response.data || []);
      } else {
      }
      setLoading(false); // Set loading to false once data fetching is complete
    };

    setOrganizationData(null); // Reset organization data when component mounts

    const timeout = setTimeout(() => {
      fetchData();
    }, 2000); // Delay fetching data by 2 seconds

    return () => clearTimeout(timeout); // Cleanup function to clear the timeout if component unmounts
  }, [user.id]);

  const findOrgIdBySelectedId = (selectedId: string) => {
    const selectedOrganization = organizationData.find(
      (org: any) => org.id === selectedId
    );
    if (selectedOrganization) {
      setSelectOrg(selectedOrganization.orgId);
      return selectedOrganization.orgId;
    } else {
      console.error("Selected organization not found in organizationData");
      return null;
    }
  };

  const handleNavigate = () => {
    findOrgIdBySelectedId(selectedOrg as string);
    navigate("/organization");
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  return (
    <CP.Styled.Flex>
      <CP.Styled.Flex direction="column" gap="20px" padding="20px">
        <CP.Styled.Flex direction="column">
          <CP.Styled.Flex direction="column"></CP.Styled.Flex>
        </CP.Styled.Flex>
        <CP.Styled.Flex direction="column">
          {organizationData && (
            <CP.Typography variant="h4">CHOOSE</CP.Typography>
          )}

          <CP.Typography variant="h4">
            {" "}
            {organizationData ? "YOUR ORGANIZATIONS" : "ORGANIZATION NOT FOUND"}
          </CP.Typography>
        </CP.Styled.Flex>
        {organizationData && organizationData.length > 0 ? (
          <Splide
            className="splide-container"
            options={{
              type: "slide",
              direction: "ttb",
              height: "9rem",
              wheel: true,
              perPage: 1,
              gap: 3,
              pagination: true,
              breakpoints: {
                768: {
                  perPage: 2,
                },
              },
            }}
          >
            {organizationData.map((organization: any, index: number) => (
              <SplideSlide>
                <ChooseOrganizationCard
                  key={index}
                  id={organization.id}
                  setActiveOrgId={setSelectedOrg} // Updated to use setSelectedOrg instead of setSelectOrganization
                  isActive={organization.id === selectedOrg} // Updated to use selectedOrg instead of selectOrganization
                  title={organization.organization.name}
                  description="You are member of ours organization , pls click Next to Login"
                />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <CP.Styled.Flex direction="column" gap="20px">
            <CP.Styled.Flex
              direction="column"
              justify="center"
              items="center"
              style={{ height: "9rem", border: "1px dashed #ccc" }}
            >
              <CP.Typography variant="h6">
                No organizations available
              </CP.Typography>
              <CP.Typography variant="body2">
                Please Create one by Click Button Create Below
              </CP.Typography>
            </CP.Styled.Flex>
            <CP.Button
              fullWidth
              onClick={() => navigate("/create-organization")}
            >
              CREATE
            </CP.Button>
          </CP.Styled.Flex>
        )}
        {organizationData && (
          <CP.Typography style={{ marginTop: "40px" }}>
            By continuing, you’re agreeing to our Main Services Agreement, User
            Terms of Service, and Riem Supplemental Terms. Additional
            disclosures are available in our Privacy Policy and Cookie Policy.
          </CP.Typography>
        )}

        {organizationData && organizationData.length > 0 && (
          <CP.Styled.Flex
            gap="20px"
            justify="flex-end"
            style={{ marginTop: "20px" }}
          >
            <CP.Button variant="text">CANCEL</CP.Button>

            {selectedOrg ? (
              <CP.Button onClick={handleNavigate}>NEXT</CP.Button>
            ) : (
              <CP.Button disabled>NEXT</CP.Button>
            )}
          </CP.Styled.Flex>
        )}
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

export default ScreenJoinOrganization;
