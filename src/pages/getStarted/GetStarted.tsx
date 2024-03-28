import React, { useState } from "react";
import CP from "@/components";
import { RoleCard } from "@/components/roleCard";
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useScreenSize from "@/hooks/useScreenSize";
import { AlreadyHaveAccountLink } from "../companySearch/CompanySearch";
import SpaWithImage, {
  ScrollableWrapper,
} from "@/components/spaWithImage/SpaWithImage";

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
        <ScrollableWrapper>
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
                style={{ maxWidth: 712 }}
              >
                Continue
              </CP.Button>
            </Flex>
            <AlreadyHaveAccountLink />
          </Flex>
        </ScrollableWrapper>
      ) : (
        <SpaWithImage>
          <Outlet />
        </SpaWithImage>
      )}
    </CP.Styled.Div>
  );
};

export default GetStarted;
