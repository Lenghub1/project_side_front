import useInput from "@/hooks/useInput";
import CP from "@/components";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const SignupPage = () => {
  const email = useInput("");
  const password = useInput("");

  return (
    <CP.Styled.Wrapper>
      <Flex height="100%">
        <CP.Styled.Div padding="0 1rem">
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
              <CP.Input label="Email or Phone number" />
              <CP.Input label="Password" type="password" />
              <CP.Input label="Confirm password" type="password" />

              <Divider></Divider>
              <Flex gap="1rem">
                <CP.Button variant="text">Cancel</CP.Button>
                <CP.Button>Signup</CP.Button>
              </Flex>
            </Flex>
          </Flex>
        </CP.Styled.Div>
        <CP.Styled.Div height="100%">
          <Flex>
            <CP.Typography variant="caption">Image</CP.Typography>
          </Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default SignupPage;
