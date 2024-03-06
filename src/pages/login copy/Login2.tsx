import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useWindow from "@/hooks/useWindow";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { snackbar, alert } = useWindow();

  const email = useInput("");
  const password = useInput("");

  return (
    <CP.Styled.Wrapper>
      <Flex height="100%">
        <CP.Styled.Div padding="0 1rem">
          <Flex items="flex-start" padding="0 3rem" direction="column">
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
              style={{
                marginBottom: "2rem",
                fontWeight: "semibold",
                textAlign: "start"
              }}
            >
              Login
            </CP.Typography>
            <Flex direction="column" gap={24}>
              <CP.Input label="Email or Phone number" />
              <CP.Input label="Password" type="password" />
              <CP.Input label="Confirm password" type="password" />
              <div style={{ width: "100%" }}>
                <CP.Checkbox label="Remember me" />
              </div>
              <CP.Button style={{ width: "100%" }}>Login</CP.Button>
            </Flex>
            <CP.Typography
              variant="subtitle1"
              color="primary"
              style={{
                margin: "1rem 0"
              }}
            >
              Forget password?
            </CP.Typography>

            <Flex direction="column">
              <CP.Typography
                variant="subtitle1"
                style={{
                  margin: "1rem 0"
                }}
              >
                OR
              </CP.Typography>
              <Flex direction="row" gap={32}>
                <img
                  style={{ width: "36px", height: "36px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                  alt=""
                />
                <img
                  style={{ width: "36px", height: "36px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                  alt=""
                />
                <img
                  style={{ width: "36px", height: "36px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                  alt=""
                />
              </Flex>
              <CP.Button
                style={{
                  width: "auto",
                  margin: "1rem 0",
                  display: "flex",
                  justifyContent: "center"
                }}
                variant="text"
              >
                Login Using Face Recognition
              </CP.Button>
            </Flex>
          </Flex>
        </CP.Styled.Div>
        <CP.Styled.Div height="100%">
          <Flex>Hello</Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default LoginPage;
