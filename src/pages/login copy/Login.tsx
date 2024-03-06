import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Store from "@/store";
import { uuid } from "@/utils/commonUtil";

import CP from "@/components";
import BeforeLoginTemplate from "@/components/template/BeforeLogin";
import useInput from "@/hooks/useInput";
import useWindow from "@/hooks/useWindow";
import { Flex } from "@/styles/styled";

const LoginPage = () => {
  const navigate = useNavigate();
  const { snackbar, alert } = useWindow();
  const [_, setLoginUser] = useRecoilState(Store.User.loginUserState);
  const [__, setCampuse] = useRecoilState(Store.User.campusState);

  const email = useInput("");
  const password = useInput("");

  const submitLogin = async () => {
    if (email.value.length === 0 || password.value.length === 0) {
      return alert("Put your email or password!");
    }

    try {
      if (email && password) {
        // Like Login Auth flow (randomId is fake token value)
        const randomId = uuid();
        setLoginUser(randomId);
        snackbar("Success Login...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log("LOGIN ERROR", error);
    }
  };

  return (
    <BeforeLoginTemplate>
      <CP.Styled.Wrapper>
        <Flex height="100%">
          <CP.Styled.Flex
            direction="row"
            height="100%"
            gap={15}
            justify="center"
            align-items="center"
          >
            <CP.Styled.Flex
              direction="column"
              height="100%"
              gap={32}
              justify="center"
              align-items="start"
            >
              {/* Heading div */}
              <CP.Styled.Div>
                <CP.Typography variant="h5" style={{ paddingBottom: "20px" }}>
                  Login
                </CP.Typography>
                <CP.Typography variant="h4" style={{ paddingBottom: "20px" }}>
                  Login
                </CP.Typography>
              </CP.Styled.Div>

              <CP.Input
                value={email.value}
                onChange={(e) => email.onChange(e)}
                placeholder="Email"
              />
              <CP.Input
                value={password.value}
                type="password"
                onChange={(e) => password.onChange(e)}
                placeholder="Password"
              />
              <CP.Button fullWidth onClick={submitLogin}>
                Login
              </CP.Button>

              <div style={{ width: "100%" }}>
                <CP.Checkbox label="remember info" />
              </div>

              <CP.Button
                style={{ width: "auto" }}
                variant="text"
                onClick={() => alert("Not yet...")}
              >
                Signup
              </CP.Button>

              {/* Flext  */}
            </CP.Styled.Flex>
            {/* Flext Image */}
            <CP.Styled.Flex>HAHA</CP.Styled.Flex>
          </CP.Styled.Flex>
        </Flex>
      </CP.Styled.Wrapper>
    </BeforeLoginTemplate>
  );
};

export default LoginPage;
