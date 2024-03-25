import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import useValidatedInput from "@/hooks/useValidatedInput";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Flex } from "../getStarted/GetStarted";
import { searchResultState } from "@/store/organizationStore";
import { useRecoilState } from "recoil";
import useScreenSize from "@/hooks/useScreenSize";

const Divider = styled(MuiDivider)`
  width: 100%;
`;

export const Title = ({ children, align }: any) => {
  const { isMobile, isTablet } = useScreenSize();

  return (
    <CP.Typography
      variant={isMobile ? "h5" : "h4"}
      style={{
        marginBottom: "2rem",
        fontWeight: "semibold",
        textAlign: align ? align : isMobile || isTablet ? "center" : "start",
      }}
    >
      {children}
    </CP.Typography>
  );
};

export const FormContainer = ({ children }: any) => {
  const { isMobile } = useScreenSize();
  return (
    <Flex
      items={isMobile ? "center" : "flex-start"}
      padding={isMobile ? "0" : "0 3rem"}
      direction="column"
      gap="1rem"
    >
      {children}
    </Flex>
  );
};

const CompanySearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const companyCode = useValidatedInput("", "Company Code");
  const isCompanySearch = location.pathname === "/get-started/company-search";
  const getCompanyCode = async () => {
    const [response, error] = await handleApiRequest(() =>
      codeOrganization(companyCode.value)
    );
    console.log(response);
    if (response) {
      setSearchOrganizationResult(response);
    }
    if (error) {
      console.log(error);
    }
  };
  const { isMobile } = useScreenSize();

  const handleCompanySearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (companyCode.value) {
      navigate(location.pathname + `/${companyCode.value}`);
    } else {
      companyCode.setTouched(true);
    }
  };

  return (
    <>
      {isCompanySearch ? (
        <>
          <CP.Styled.Form>
            <FormContainer>
              <CP.Styled.Div>
                <Title>Search Company</Title>
                <Flex direction="column" gap="1.5rem" items="flex-start">
                  <CP.Typography variant="body1">
                    You can search for a company by typing in the correct
                    company code.
                  </CP.Typography>

                  <CP.Input
                    label="Company Code"
                    required
                    value={companyCode.value}
                    onChange={companyCode.onChange}
                    onBlur={companyCode.onBlur}
                    error={!!companyCode.error}
                    helperText={<companyCode.HelperText />}
                  />

                  <Flex gap="1rem" justify={isMobile ? "center" : "flex-end"}>
                    <CP.Button variant="text">Cancel</CP.Button>
                    <CP.Button type="submit" onClick={handleCompanySearch}>
                      Search
                    </CP.Button>
                  </Flex>
                </Flex>
              </CP.Styled.Div>
              <CP.Styled.Div>
                <Title>Join by invitation</Title>
                <CP.Typography variant="body1">
                  Check your inbox (and spam folder) for a Riem invite from your
                  manager
                </CP.Typography>
                <CP.Typography variant="body1">
                  If your manager hasn’t invited you yet, please contact and
                  provide them your email or phone number to invite you
                </CP.Typography>
              </CP.Styled.Div>
            </FormContainer>
            <Flex direction="column" margin="1rem 0 0" gap="1rem">
              <Divider></Divider>
              <CP.Typography>
                Already have an account? <NavLink to="#">Login here</NavLink>
              </CP.Typography>
            </Flex>
          </CP.Styled.Form>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default CompanySearch;
