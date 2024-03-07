import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Div } from "@/styles/styled";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const ResetPassword = () => {
  const navigate = useNavigate();

  const email = useInput("");
  const password = useInput("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);

  console.log("Window asdasd", window.screen.width);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };
    console.log("Window size", window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CP.Styled.Wrapper>
      <Flex height="100%">
        <CP.Styled.Div padding={!isMobile ? "0 1rem" : "0 16px"} width="600px">
          <Flex direction="column" padding={!isMobile ? "0 3rem" : "0px"}>
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              textAlign="start"
              width={"100%"}
            >
              New Password
            </CP.Typography>
            <Flex direction="column" justify-content="start">
              <CP.Typography
                fontWeight="semibold"
                width={"100%"}
                textAlign={"start"}
              >
                Please enter and confirm your new password
              </CP.Typography>
              <CP.Typography
                fontWeight="semibold"
                width={"100%"}
                textAlign={"start"}
                marginBottom={"2rem"}
              >
                Minimum of 8 characters.
              </CP.Typography>
            </Flex>
            <Flex direction="column" gap="24px" overflow="unset">
              <Flex gap={"16px"} direction="column">
                <CP.Input label="New assword" />
                <CP.Input label="Confirm password" />
              </Flex>

              <Flex justify="end" gap="20px">
                <CP.Button variant="text">Cancel</CP.Button>
                <CP.Button>SAVE</CP.Button>
              </Flex>
            </Flex>
          </Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default ResetPassword;
