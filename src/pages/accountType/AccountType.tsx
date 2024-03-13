import { useState } from "react";
import CP from "@/components";
import { RoleCard } from "@/components/roleCard";
import styled from "styled-components";
import { Flex } from "../signup/Signup";
import { Link, Outlet, useLocation } from "react-router-dom";

const GetStarted = () => {
  const location = useLocation();
  const [accountType, setAccountType] = useState<
    "employer" | "employee" | null
  >(null);

  const isGetStartedRoute = location.pathname === "/get-started";

  return (
    <CP.Styled.Div>
      {isGetStartedRoute ? (
        <Container direction="column">
          <CP.Styled.Flex direction="column" padding="0 0 2rem">
            <CP.Typography variant="h4" gutterBottom>
              Get started with Riem
            </CP.Typography>
            <CP.Typography variant="subtitle1">Choose your role</CP.Typography>
          </CP.Styled.Flex>
          <Flex direction="column" gap="2rem">
            <Flex gap="2rem">
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
            <Link
              to={
                accountType === "employer"
                  ? "/get-started/create-account"
                  : "/join-team"
              }
              style={{ width: "100%" }}
            >
              <CP.Button
                fullWidth
                size="large"
                variant="contained"
                disabled={!accountType}
              >
                Continue
              </CP.Button>
            </Link>
          </Flex>
        </Container>
      ) : (
        <Outlet />
      )}
    </CP.Styled.Div>
  );
};

const Container = styled(Flex)`
  height: 100vh;
  max-width: 712px;
  margin-left: auto;
  margin-right: auto;
`;

export default GetStarted;
