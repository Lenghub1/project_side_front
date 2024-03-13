import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import { authApi } from "@/api/auth";
import useValidatedInput from "@/hooks/useValidatedInput";
import { SyntheticEvent, useState } from "react";
import useApi from "@/hooks/useApi";
import { useSnackbar } from "notistack";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/store/userStore";
import { useNavigate, NavLink } from "react-router-dom";
import { Flex } from "../signup/Signup";
import Box from "@mui/material/Box";

const Divider = styled(MuiDivider)`
  width: 100%;
`;

const CompanyLookup = () => {
  const navigate = useNavigate();
  const { isLoading, handleApiRequest } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const companyCode = useValidatedInput("", "Company Code");

  function showError(message: string) {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }

  async function login(method: string, data: any): Promise<void> {
    // const [response, error] = await handleApiRequest(() =>
    //   authApi.testLogin(method, data)
    // );
  }

  function handleOnSubmit() {
    if (!companyCode.value) {
      companyCode.setTouched(true);
    }
  }

  const Title = ({ children }: any) => (
    <CP.Typography
      variant="h4"
      style={{
        marginBottom: "2rem",
        fontWeight: "semibold",
        textAlign: "start",
      }}
    >
      {children}
    </CP.Typography>
  );

  return (
    <CP.Styled.Wrapper height="100vh" padding="0">
      <Flex height="100%">
        <CP.Styled.Div padding="0 1rem">
          <CP.Styled.Form>
            <Flex
              items="flex-start"
              padding="0 3rem"
              direction="column"
              gap="1rem"
            >
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

                  <Flex gap="1rem" justify="flex-end">
                    <CP.Button variant="text">Cancel</CP.Button>
                    <CP.Button type="submit" onClick={handleOnSubmit}>
                      Login
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
            </Flex>
            <Flex direction="column" margin="1rem 0 0" gap="1rem">
              <Divider></Divider>
              <CP.Typography>
                Already have an account? <NavLink to="#">Login here</NavLink>
              </CP.Typography>
            </Flex>
          </CP.Styled.Form>
        </CP.Styled.Div>
        <CP.Styled.Div height="100%">
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
  );
};

export default CompanyLookup;
