import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useValidatedInput from "@/hooks/useValidatedInput";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";
import { SyntheticEvent } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import countries from "@/components/phonePrefix/countries.json";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookLoginButton from "./FacebookLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import Store from "@/store";
import TelegramLoginButton from "./TelegramLoginButton";
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
  const [singInMethod, setSignInMethod] = useState<SignInMethod>("email");
  const email = useValidatedInput("", "Email", validateEmail);
  const phone = useValidatedInput("", "Phone");
  const password = useValidatedInput("", "Password");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    dialCode: string;
    flag: string;
  }>(countries[0]);
  const [_, setLoginUser] = useRecoilState(Store.User.userState);
  const activeTabIndex = singInMethod === "email" ? 0 : 1;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [email.value, phone.value, password.value]);

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
    setSignInMethod(method);
  };

  const isFormInvalid =
    (singInMethod === "phone"
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
  const { response, error, isError, handleApiRequest } = useApi();
  //function for login api
  async function login(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.testLogin(method, data));

    setLoginUser({
      token: response.data.user.accessToken,
      userId: response.data.user.id,
    });
    setTimeout(() => {
      showMessage("Login Successfully!", "success");
      navigate("/");
    }, 1500);
  }

  useEffect(() => {
    const userData = response?.data as LoginResponse;
    if (userData?.user) {
      console.log(userData.user);
      setAccessToken(userData.user?.accessToken);
      navigate("/");
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      console.log("ERRRRRRR", error);
      if (error?.statusCode === 400) {
        showMessage(
          `${singInMethod === "email" ? "Email" : "Phone number"} or password is incorrect`,
          "error"
        );
      } else if (error?.statusCode === 401) {
        showMessage("Unauthorized. Pleaser verify your account", "error");
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

    if (singInMethod === "email") {
      formData = { ...formData, email: email.value };
    } else if (singInMethod === "phone") {
      // remove leading 0 from phone number (E.164 format)
      const phoneWithoutLeadingZero = phone.value.replace(/^0+/, "");

      formData = {
        ...formData,
        phoneNumber: selectedCountry.dialCode + phoneWithoutLeadingZero,
      };
    }

    await login(singInMethod, formData);
  };

  const handleTelegramData = async (user: any) => {
    await authApi.telegramOauth(user);
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
                <CP.Typography width="100%">
                  Don't have an account?{" "}
                  <a style={{ color: "red", textDecoration: "none" }}>
                    {" "}
                    Sign Up today
                  </a>
                </CP.Typography>
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
              {singInMethod === "email" ? (
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
                error={password.error}
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
              {isMobile && (
                <Flex direction="row" gap="40px" margin="1rem 0 0">
                  <FacebookLoginButton />
                  <GoogleLoginButton />
                  {/* <Box
                    component="img"
                    sx={{
                      height: 36,
                      width: 36,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      (window.location.href =
                        "https://oauth.telegram.org/auth?bot_id=7091265126&origin=https%3A%2F%2Ff643-167-179-40-121.ngrok-free.app&embed=1&request_access=write&lang=en&return_to=https%3A%2F%2Ff643-167-179-40-121.ngrok-free.app%2Fapi%2Fv1%2Fauth%2Ftelegram%2Ftest")
                    }
                    alt="Image for telegram"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png"
                  /> */}
                  <TelegramLoginButton
                    onAuthCallback={handleTelegramData}
                    botUsername="riem_app_bot"
                  />
                </Flex>
              )}
              {isMobile && (
                <CP.Styled.Flex width="100%" justify="start">
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
                <CP.Typography
                  margin="1rem 0"
                  onClick={() => navigate("/get-started")}
                >
                  Don't have an account?{" "}
                  <a style={{ color: "red", textDecoration: "none" }}>
                    {" "}
                    Sign Up today
                  </a>
                </CP.Typography>
              )}
              {!isMobile && (
                <CP.Styled.Flex width="100%" justify="start">
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

              {!isMobile && (
                <Flex direction="row" gap="40px" margin="1rem">
                  <FacebookLoginButton />
                  <GoogleLoginButton />
                  {/* <Box
                    component="img"
                    sx={{
                      height: 36,
                      width: 36,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    onClick={() =>
                      (window.location.href =
                        "https://oauth.telegram.org/auth?bot_id=7091265126&origin=https%3A%2F%2Ff643-167-179-40-121.ngrok-free.app&embed=1&request_access=write&lang=en&return_to=https%3A%2F%2Ff643-167-179-40-121.ngrok-free.app%2Fapi%2Fv1%2Fauth%2Ftelegram%2Ftest")
                    }
                    alt="Image for telegram"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png"
                  /> */}
                  <TelegramLoginButton
                    onAuthCallback={handleTelegramData}
                    botUsername="riem_app_bot"
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

export default LoginPage;
