import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useWindow from "@/hooks/useWindow";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const LoginPage = () => {
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
        <CP.Styled.Div
          style={{
            minWidth: isMobile ? "396px" : "565px",
            padding: !isMobile ? "0 1rem" : "0 16px"
          }}
        >
          <Flex
            items="flex-start"
            direction="column"
            style={{
              padding: !isMobile ? "0 3rem" : "0px"
            }}
          >
            <CP.Typography
              variant="h5"
              style={{
                marginBottom: "1rem"
              }}
            >
              welcome back
            </CP.Typography>
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              fontWeight="semibold"
              textAlign={isMobile ? "center" : "start"}
            >
              Login
            </CP.Typography>
            <Flex direction="column" gap="24px">
              {!isMobile && (
                <CP.Typography width="100%">
                  Don't have an account?{" "}
                  <a href="" style={{ color: "red", textDecoration: "none" }}>
                    {" "}
                    Sign Up today
                  </a>
                </CP.Typography>
              )}

              <CP.Input label="Email or Phone number" />
              <CP.Input label="Password" type="password" />
              <div style={{ width: "100%" }}>
                <CP.Checkbox label="Remember me" />
              </div>
              {isMobile && (
                <Flex direction="row" gap="40px" margin="1rem 0 0">
                  <img
                    style={{ width: "36px", height: "36px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                    alt=""
                  />
                  <img
                    style={{ width: "36px", height: "36px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
                    alt=""
                  />
                  <img
                    style={{ width: "36px", height: "36px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                    alt=""
                  />
                </Flex>
              )}
              {isMobile && (
                <CP.Typography
                  margin="1rem 0"
                  width="100%"
                  color="red"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/forgetpassword");
                  }}
                >
                  Forget password?
                </CP.Typography>
              )}
              <CP.Button style={{ width: "100%" }}>Login</CP.Button>
              {/* Mobile responsive */}
              {isMobile && (
                <CP.Typography margin="1rem 0">
                  Don't have an account?{" "}
                  <a href="" style={{ color: "red", textDecoration: "none" }}>
                    {" "}
                    Sign Up today
                  </a>
                </CP.Typography>
              )}
              {!isMobile && (
                <CP.Typography
                  width="100%"
                  sx={{ cursor: "pointer", color: "red" }}
                >
                  Forget password?
                </CP.Typography>
              )}
            </Flex>

            <Flex direction="column">
              {/* responsive mobile or */}
              {!isMobile && (
                <CP.Typography
                  variant="subtitle1"
                  style={{
                    margin: "1rem 0"
                  }}
                >
                  OR
                </CP.Typography>
              )}

              {!isMobile && (
                <Flex direction="row" gap="40px" margin="1rem">
                  <img
                    style={{ width: "36px", height: "36px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                    alt=""
                  />
                  <img
                    style={{ width: "36px", height: "36px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
                    alt=""
                  />
                  <img
                    style={{ width: "36px", height: "36px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                    alt=""
                  />
                </Flex>
              )}

              {isMobile && (
                <CP.Typography margin="0 0 1rem" textAlign={"center"}>
                  By signing up, you agree to our 
                  <CP.Typography
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Terms of . Service & Privacy Policy.
                  </CP.Typography>
                </CP.Typography>
              )}

              <CP.Button variant="text">Login Using Face Recognition</CP.Button>
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
                  maxHeight: "100%"
                }}
              />
            </Flex>
          </CP.Styled.Div>
        )}
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default LoginPage;
