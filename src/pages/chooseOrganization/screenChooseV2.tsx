import { Avatar, Container, Grid } from "@mui/material";
import { Divider } from "../signup/Signup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChooseOrganizationCardV2 from "@/components/organization/chooseOrganizationCardV2";

import CP from "@/components";
import { useState, useEffect } from "react";

import { allWorkplace } from "@/api/employee";
import { handleApiRequest } from "@/api";

import { userState, selectedOrganization } from "@/store/userStore"; // Renamed selectOrganization to selectedOrg
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { organizationState } from "@/store/organizationStore";

import Loading from "@/components/loading/Loading";

import { employeeId } from "@/store/employee";

const ScreenChooseV2 = () => {
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useState<string>();
  const [selectOrg, setSelectOrg] = useRecoilState(selectedOrganization);
  const [selectEmployee, setSelectEmployee] = useRecoilState(employeeId);

  const [organizationData, setOrganizationData] =
    useRecoilState(organizationState);
  const user = useRecoilValue(userState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [response, error] = await handleApiRequest(() =>
        allWorkplace(user.id)
      );

      if (response) {
        setOrganizationData(response.data);
      } else {
      }
      setLoading(false);
    };

    setOrganizationData(null);

    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [user.id]);

  const findOrgIdBySelectedId = (selectedId: string) => {
    const selectedOrganization = organizationData.find(
      (org: any) => org.id === selectedId
    );
    if (selectedOrganization) {
      setSelectOrg(selectedOrganization.orgId);

      setSelectEmployee(selectedOrganization.id);
      return selectedOrganization.orgId;
    } else {
      console.error("Selected organization not found in organizationData");
      return null;
    }
  };

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <>
      <CP.Styled.Flex justify="space-between" padding="20px">
        <CP.Typography> Riem_app</CP.Typography>
        <CP.Styled.Flex gap="10px" justify="flex-end">
          <Avatar />
          <CP.Typography>Hello, Name</CP.Typography>
        </CP.Styled.Flex>
      </CP.Styled.Flex>
      <Divider />
      <Container style={{ marginBottom: "20px" }}>
        <CP.Styled.Flex>
          <CP.Styled.Flex gap="20px" padding="20px">
            <Avatar />
            <CP.Styled.Div>
              <CP.Typography>CEO meow</CP.Typography>
              <CP.Styled.Flex gap="10px" justify="flex-start">
                <MailOutlineIcon />
                <CP.Typography>hourleng9@gmail.com</CP.Typography>
              </CP.Styled.Flex>
            </CP.Styled.Div>
          </CP.Styled.Flex>
          <CP.Button style={{ width: "150px" }} variant="outlined">
            Edit profile
          </CP.Button>
        </CP.Styled.Flex>
        <Divider />
        <CP.Styled.Flex direction="column" margin="20px 0">
          <CP.Styled.Flex justify="space-between">
            <CP.Typography variant="h5">
              <strong>Businesses</strong>
            </CP.Typography>
            <CP.Button style={{ width: "200px" }} variant="outlined">
              Add a new business
            </CP.Button>
          </CP.Styled.Flex>
        </CP.Styled.Flex>

        <Grid container spacing={2}>
          {organizationData.map((organization: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ChooseOrganizationCardV2
                id={organization.id}
                setActiveOrgId={setSelectedOrg}
                isActive={organization.id === selectedOrg}
                title={organization.organization.name}
                description="You are member of ours organization , pls click Next to Login"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ScreenChooseV2;
