import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const OTP = () => {
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
    <CP.Styled.Wrapper height="100vh">
      <Flex height="inherit">
        <CP.Styled.Div padding={!isMobile ? "0 1rem" : "0 16px"} width="600px">
          <Flex
            items="flex-start"
            direction="column"
            padding={!isMobile ? "0 3rem" : "0px"}
          >
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              textAlign="center"
              width={"100%"}
            >
              OTP Verification
            </CP.Typography>
            <Flex direction="column">
              <CP.Typography fontWeight="semibold" textAlign="center">
                Enter the verification code we just sent to your
              </CP.Typography>
              <CP.Typography marginBottom={"2rem"}>
                number {"+855 ********* 10"}
              </CP.Typography>
            </Flex>
            <Flex direction="column" gap="24px" overflow="unset">
              <Flex gap={"16px"}>
                <CP.InputBox />
                <CP.InputBox />
                <CP.InputBox />
                <CP.InputBox />
                <CP.InputBox />
                <CP.InputBox />
              </Flex>
              <Flex>
                <CP.Typography marginRight={1}>
                  Didn't receive code?{" "}
                </CP.Typography>
                <CP.Typography
                  fontWeight="semibold"
                  color={"primary"}
                  sx={{ cursor: "pointer" }}
                >
                  {" "}
                  Resend
                </CP.Typography>
              </Flex>
              <CP.Button>Verify</CP.Button>
              <CP.Typography
                fontWeight="semibold"
                sx={{ cursor: "pointer" }}
                margin={1}
              >
                CHANGE PHONE NUMBER
              </CP.Typography>
            </Flex>
          </Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default OTP;
