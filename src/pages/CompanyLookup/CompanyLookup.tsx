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
    const [response, error] = await handleApiRequest(() =>
      authApi.testLogin(method, data)
    );
  }

  return (
    <CP.Styled.Wrapper height="100vh" padding="0">
      <Flex height="100%">
        <CP.Styled.Div padding="0 1rem">
          <CP.Styled.Form>
            <Flex items="flex-start" padding="0 3rem" direction="column">
              <CP.Typography
                variant="h4"
                style={{
                  marginBottom: "2rem",
                  fontWeight: "semibold",
                  textAlign: "start",
                }}
              >
                Login
              </CP.Typography>

              <Flex direction="column" gap="1.5rem">
                <Divider></Divider>
                <Flex gap="1rem">
                  <CP.Button
                    type="submit"
                    onClick={() => console.log("Submit")}
                    fullWidth
                  >
                    Login
                  </CP.Button>
                </Flex>

                <CP.Typography variant="subtitle2">
                  By signing up, you agree to our{" "}
                  <NavLink to="#">Terms of Service</NavLink> &{" "}
                  <NavLink to="#">Privacy Policy</NavLink>
                </CP.Typography>
              </Flex>
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
