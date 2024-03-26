import CP from "@/components";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { Flex } from "../getStarted/GetStarted";
import { Title, FormContainer } from "../companySearch/CompanySearch";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { employeeRegister } from "@/store/organizationStore";
import { handleApiRequest } from "@/api";
import { codeOrganization } from "@/api/organization";
import { useEffect, useState } from "react";

interface RegisterAsEmployee {
  orgId: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CompanySearchResult = () => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState<any>();
  const [regisgerAsEmployee, setRegisterAsEmployee] =
    useRecoilState<RegisterAsEmployee>(employeeRegister);

  const { companyId } = useParams<string>() || undefined;
  const getCompanyCode = async () => {
    const [response, error] = await handleApiRequest(() =>
      codeOrganization(companyId as string)
    );
    console.log(response);
    if (response) {
      setSearchResult(response);
    }
    if (error) {
      console.log(error);
    }
  };

  const handleContinueClick = () => {
    if (searchResult) {
      setRegisterAsEmployee(searchResult);
      navigate("/get-started/join-company");
    } else {
      redirect("/get-started/company-search");
    }
  };
  useEffect(() => {
    getCompanyCode();
  }, []);
  console.log(regisgerAsEmployee);

  return (
    <>
      <FormContainer>
        <CP.Styled.Div>
          <Title>{searchResult?.name}</Title>
          <Flex direction="column" gap="1.5rem" items="flex-start">
            <Flex gap="1rem" items="flex-start">
              <Box
                component="img"
                src="https://media.licdn.com/dms/image/C560BAQHLhFFea37ieg/company-logo_200_200/0/1678258178697/emcast_logo?e=2147483647&v=beta&t=8KO3gl8KoLDHZiFg1NYaQm3iNQR9Rj3wP-JS-jtA-fc"
                alt="Emcast"
                sx={{
                  width: "10rem",
                  objectFit: "cover",
                }}
              />
              <CP.Typography variant="body1">
                <b>{searchResult?.name}</b> is a global educational technology
                company based in South Korea, specializing in e-learning content
                development and offering a consilience learning platform for
                learning curation. The company focuses on various sectors
                including retail, franchise, and corporate employee education.
              </CP.Typography>
            </Flex>

            <Flex gap="1rem">
              <CP.Button variant="text">Cancel</CP.Button>
              <CP.Button type="submit" onClick={handleContinueClick}>
                Continue
              </CP.Button>
            </Flex>
          </Flex>
        </CP.Styled.Div>
      </FormContainer>
    </>
  );
};

export default CompanySearchResult;
