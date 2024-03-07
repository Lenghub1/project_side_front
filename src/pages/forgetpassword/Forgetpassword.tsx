import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const ForgetPassword = () => {
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
        <CP.Styled.Div
          style={{
            minWidth: isMobile ? "396px" : "565px",
            padding: !isMobile ? "0 1rem" : "0 16px",
          }}
        >
          <Flex
            items="flex-start"
            direction="column"
            style={{
              padding: !isMobile ? "0 3rem" : "0px",
            }}
          >
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              style={{
                fontWeight: "semibold",
                textAlign: isMobile ? "center" : "start",
                width: "100%",
              }}
            >
              Password Reset
            </CP.Typography>
            <CP.Typography
              style={{
                marginBottom: "2rem",
                fontWeight: "semibold",
                textAlign: isMobile ? "start" : "start",
                width: "100%",
              }}
            >
              Enter you email address below and we'll send you password reset
              OTP.
            </CP.Typography>
            <Flex direction="column" gap="24px" overflow="unset">
              <CP.Input label="Email or Phone number" />

              <CP.Typography
                margin="1rem 0"
                width="100%"
                color="red"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/forgetpassword");
                }}
              >
                Forgotten account?
              </CP.Typography>
              <Flex width="100%" justify="end" gap="20px">
                <CP.Button variant="text">Cancel</CP.Button>
                <CP.Button>reset</CP.Button>
              </Flex>
            </Flex>
          </Flex>
        </CP.Styled.Div>
        {!isMobile && (
          <CP.Styled.Div height="100%">
            <Flex style={{ height: "100%" }}>
              <img
                src="https://wallpapers.com/images/featured/anime-aesthetic-pictures-lqtumoq8zq18qvfs.jpg"
                alt=""
                style={{
                  width: "auto",
                  height: "auto",
                  objectFit: "cover",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Flex>
          </CP.Styled.Div>
        )}
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default ForgetPassword;
