import { useState } from "react";
import CP from "@/components";
import { RoleCard } from "@/components/roleCard";
import styled from "styled-components";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useScreenSize from "@/hooks/useScreenSize";

export const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const GetStarted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<
    "employer" | "employee" | null
  >(null);
  const { isMobile, isTablet } = useScreenSize();

  const isGetStartedRoute = location.pathname === "/get-started";

  const handleOnButtonClick = () => {
    if (accountType === "employee") {
      navigate("/get-started/company-search");
    } else if (accountType === "employer") {
      navigate("/get-started/create-account");
    }
  };

  return (
    <CP.Styled.Div>
      {isGetStartedRoute ? (
        <Container direction="column">
          <CP.Styled.Flex direction="column" padding="0 0 2rem">
            <CP.Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
              Get started with Riem
            </CP.Typography>
            <CP.Typography variant="subtitle1">Choose your role</CP.Typography>
          </CP.Styled.Flex>
          <Flex direction="column" gap="2rem" padding="auto">
            <Flex
              direction={isMobile ? "column" : "row"}
              gap="2rem"
              padding="0 1rem"
            >
              <RoleCard
                accountType={accountType}
                setAccountType={setAccountType}
                role="employee"
                image="https://web.jibble.io/img/signup-type-2.06ebdf3e.svg"
                title="I am an employee"
                description="Join your company's workspace as a team member"
              />
              <RoleCard
                accountType={accountType}
                setAccountType={setAccountType}
                role="employer"
                image="https://web.jibble.io/img/signup-type-1.7657a54a.svg"
                title="I am an employer"
                description="Create a new organization to manage time & attendance for your team"
              />
            </Flex>

            <Flex padding="0 1rem">
              <CP.Button
                fullWidth
                size="large"
                variant="contained"
                disabled={!accountType}
                onClick={handleOnButtonClick}
              >
                Continue
              </CP.Button>
            </Flex>
          </Flex>
        </Container>
      ) : (
        <CP.Styled.Wrapper padding="0">
          <Flex height="100%">
            <CP.Styled.Div padding="0 1rem">
              <Outlet />
            </CP.Styled.Div>
            <CP.Styled.Div
              height="100%"
              style={{ display: isMobile || isTablet ? "none" : "block" }}
            >
              <Flex>
                <Box
                  component="img"
                  src="/random-unsplash.jpg"
                  alt="Random image"
                  sx={{
                    width: 1,
                    height: "100vh",
                    objectFit: "cover",
                  }}
                />
              </Flex>
            </CP.Styled.Div>
          </Flex>
        </CP.Styled.Wrapper>
      )}
    </CP.Styled.Div>
  );
};

const Container = styled(Flex)`
  min-height: 100vh;
  max-width: 712px;
  margin: auto;
  padding: 1rem 0;
`;

export default GetStarted;
