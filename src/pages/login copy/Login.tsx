import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useValidatedInput from "@/hooks/useValidatedInput";
import { authApi } from "@/api/auth";
import { SyntheticEvent } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import countries from "@/components/phonePrefix/countries.json";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Store from "@/store";
import OauthComponent from "@/components/oauth/OauthComponent";
import useApi from "@/hooks/useApi";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;
type SignInMethod = "email" | "phone";

// validate email function
const validateEmail = (email: string): string => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

interface LoginResponse {
  user: {
    accessToken: string;
  };
}
const LoginPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginMethod, setLoginMethod] = useState<SignInMethod>("email");
  const email = useValidatedInput("", "Email", validateEmail);
  const phone = useValidatedInput("", "Phone");
  const password = useValidatedInput("", "Password");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);
  const [isTablet, setIsTable] = useState(window.innerWidth <= 960);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    dialCode: string;
    flag: string;
  }>(countries[0]);
  const setAccessToken = useSetRecoilState(Store.User.accessTokenState);
  const activeTabIndex = loginMethod === "email" ? 0 : 1;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
      setIsTable(window.innerWidth <= 960);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignInMethodChange = (
    event: SyntheticEvent,
    newValue: number
  ) => {
    const method = newValue === 0 ? "email" : "phone";
    if (method === "phone" && email.touched) {
      email.setTouched(false);
      if (email.value) email.setValue("");
    } else if (method === "email" && phone.touched) {
      phone.setTouched(false);

      if (phone.value) phone.setValue("");
    }
    setLoginMethod(method);
  };

  const isFormInvalid =
    (loginMethod === "phone"
      ? !phone.value || !!phone.error
      : !email.value || !!email.error) || !password.value;

  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: isMobile ? "center" : "left", // or 'left', 'center'
      },
    });
  }
  const { response, error, isSuccess, handleApiRequest } = useApi();
  //function for login api
  async function login(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.testLogin(method, data));

    // setTimeout(() => {
    //   showMessage("Login Successfully!", "success");
    //   navigate("/");
    // }, 1500);
  }

  useEffect(() => {
    if (isSuccess) {
      const userData = response.data as LoginResponse;
      if (userData?.user) {
        console.log(userData.user);
        setAccessToken(userData.user?.accessToken);
        navigate("/");
      }
    }
  }, [response, isSuccess]);

  useEffect(() => {
    if (error) {
      console.log("ERRRRRRR", error);
      if (error?.statusCode === 400) {
        showMessage(
          `${loginMethod === "email" ? "Email" : "Phone number"} or password is incorrect`,
          "error"
        );
      } else if (error.statusCode === 401) {
        navigate("/get-started/activate-account", {
          state: {
            credential: loginMethod === "email" ? email.value : phone.value,
            accountMethod: loginMethod,
          },
        });
      } else {
        showMessage("Something went wrong. Please try again.", "error");
      }
    }
  }, [error]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      return;
    }

    let formData: any = {
      password: password.value,
    };

    if (loginMethod === "email") {
      formData = { ...formData, email: email.value };
    } else if (loginMethod === "phone") {
      // remove leading 0 from phone number (E.164 format)
      const phoneWithoutLeadingZero = phone.value.replace(/^0+/, "");

      formData = {
        ...formData,
        phoneNumber: selectedCountry.dialCode + phoneWithoutLeadingZero,
      };
    }

    await login(loginMethod, formData);
  };

  return (
    <CP.Styled.Wrapper height="100vh">
      <Flex height="inherit">
        <CP.Styled.Div
          padding={!isMobile ? "0 1rem" : "0 16px"}
          style={{
            minWidth: isMobile ? "396px" : "565px",
            maxWidth: "900px",
          }}
        >
          <Flex direction="column" padding={!isMobile ? "0 3rem" : "0px"}>
            <CP.Typography
              variant="h5"
              width={"100%"}
              marginBottom={"1rem"}
              textAlign={"start"}
            >
              welcome back
            </CP.Typography>

            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              width={"100%"}
              fontWeight="semibold"
              textAlign={isMobile ? "center" : "start"}
            >
              Login
            </CP.Typography>

            <Flex direction="column" gap="24px">
              {!isMobile && (
                <CP.Styled.Flex width="100%" justify="flex-start" gap="8px">
                  <CP.Typography>Don't have an account? </CP.Typography>{" "}
                  <CP.Typography
                    margin="1rem 0"
                    onClick={() => navigate("/get-started")}
                    color={"red"}
                    sx={{ cursor: "pointer" }}
                  >
                    Sign Up today
                  </CP.Typography>
                </CP.Styled.Flex>
              )}
              <Tabs
                sx={{ alignSelf: !isMobile ? "flex-start" : "center" }}
                value={activeTabIndex}
                onChange={(e, value) => handleSignInMethodChange(e, value)}
                aria-label="signup options"
              >
                <Tab label="With Email" />
                <Tab label="With Phone" />
              </Tabs>
              {loginMethod === "email" ? (
                <CP.Input
                  label="Email"
                  value={email.value}
                  onChange={email.onChange}
                  placeholder="Email"
                  type="email"
                  onBlur={email.onBlur}
                  error={!!email.error}
                  helperText={<email.HelperText />}
                  required
                />
              ) : (
                <Flex gap="0.5rem" items="flex-start">
                  <CP.PhonePrefix
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                  />
                  <CP.Input
                    label="Phone number"
                    value={phone.value}
                    type="number"
                    onChange={phone.onChange}
                    placeholder="Phone"
                    onBlur={phone.onBlur}
                    error={!!phone.error}
                    helperText={<phone.HelperText />}
                    required
                  />
                </Flex>
              )}
              <CP.Input
                label="Password"
                type={isPassword ? "text" : "password"}
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
                error={!!password.error}
                helperText={<password.HelperText />}
                required
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setIsPassword((prev) => !prev)}>
                      {isPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
              <div style={{ width: "100%" }}>
                <CP.Checkbox label="Remember me" />
              </div>
              {isMobile && <OauthComponent />}
              {isMobile && (
                <CP.Styled.Flex width="100%" justify="flex-start">
                  <CP.Typography
                    margin="1rem 0"
                    color="red"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/forget-password");
                    }}
                  >
                    Forget password?
                  </CP.Typography>
                </CP.Styled.Flex>
              )}
              <CP.Button
                fullWidth
                type="submit"
                onClick={handleSubmit}
                disabled={isFormInvalid}
              >
                Login
              </CP.Button>
              {/* Mobile responsive */}
              {isMobile && (
                <CP.Styled.Flex width="100%" justify="flex-start" gap="8px">
                  <CP.Typography>Don't have an account? </CP.Typography>{" "}
                  <CP.Typography
                    margin="1rem 0"
                    onClick={() => navigate("/get-started")}
                    color={"red"}
                    sx={{ cursor: "pointer" }}
                  >
                    Sign Up today
                  </CP.Typography>
                </CP.Styled.Flex>
              )}
              {!isMobile && (
                <CP.Styled.Flex width="100%" justify="flex-start">
                  <CP.Typography
                    margin="1rem 0"
                    color="red"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/forget-password");
                    }}
                  >
                    Forget password?
                  </CP.Typography>
                </CP.Styled.Flex>
              )}
            </Flex>

            <Flex direction="column">
              {/* responsive mobile or */}
              {!isMobile && (
                <CP.Typography
                  variant="subtitle1"
                  style={{
                    margin: "1rem 0",
                  }}
                >
                  OR
                </CP.Typography>
              )}

              {!isMobile && <OauthComponent />}

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

        {!isTablet && (
          <CP.Styled.Div height="100%">
            <Flex style={{ height: "100%" }}>
              <Box
                component="img"
                src="/random-unsplash.jpg"
                alt="Random image"
                width={1}
                height={"100vh"}
                sx={{
                  width: 1,
                  height: "100vh",
                  objectFit: "cover",
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
