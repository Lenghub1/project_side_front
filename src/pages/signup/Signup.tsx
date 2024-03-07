import useInput from "@/hooks/useInput";
import CP from "@/components";
import MuiDivider from "@material-ui/core/Divider";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const Divider = styled(MuiDivider)`
  width: 100%;
`;

interface SignupProps {
  accountType: "employee" | "employer";
}

const SignupPage = ({ accountType = "employer" }: SignupProps) => {
  const email = useInput("");
  const password = useInput("");

  return (
    <CP.Styled.Wrapper>
      <Flex height="100%">
        <CP.Styled.Div padding="0 1rem">
          <CP.Styled.Form>
            <Flex items="flex-start" padding="0 3rem" direction="column">
              <CP.Typography
                variant="h4"
                style={{
                  marginBottom: "2rem",
                  fontWeight: "semibold",
                  textAlign: "start"
                }}
              >
                Create a new account
              </CP.Typography>
              <Flex direction="column" gap="24px">
                {accountType === "employer" && (
                  <>
                    <CP.Input label="First name" required />
                    <CP.Input label="Last name" required />
                  </>
                )}
                <CP.Input label="Email or Phone number" required />
                <CP.Input label="Password" type="password" required />
                <CP.Input label="Confirm password" type="password" required />

                <Divider></Divider>
                <Flex gap="1rem">
                  <CP.Button variant="text">Cancel</CP.Button>
                  <CP.Button type="submit">Signup</CP.Button>
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
            <CP.Typography variant="subtitle1">Image</CP.Typography>
          </Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default SignupPage;
