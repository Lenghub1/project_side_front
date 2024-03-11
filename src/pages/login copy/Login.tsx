import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useInput from "@/hooks/useInput";
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
import axios from "axios";
import FacebookLoginButton from "./FacebookLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

type SignupMethod = "email" | "phone";

// validate email function
const validateEmail = (email: string): string => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};
const LoginPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [signupMethod, setSignupMethod] = useState<SignupMethod>("email");
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
  const activeTabIndex = signupMethod === "email" ? 0 : 1;
  console.log("Window asdasd", window.screen.width);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [email.value, phone.value, password.value]);

  const handleSignupMethodChange = (
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
    setSignupMethod(method);
    console.log("Method", signupMethod);
  };

  const isFormInvalid =
    (signupMethod === "phone"
      ? !phone.value || !!phone.error
      : !email.value || !!email.error) || !password.value;

  console.log("is for valid", isFormInvalid);

  function showError(message: string) {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: isMobile ? "center" : "left", // or 'left', 'center'
      },
    });
  }

  //function for login api
  async function login(method: string, data: any): Promise<void> {
    console.log("Data before submit: ", data);
    const [response, error] = await handleApiRequest(() =>
      authApi.login(method, data)
    );
    console.log("Response", response);

    console.log("error", error);

    if (error) {
      if (error?.response?.status === 400) {
        if (signupMethod === "email") {
          showError("Email or password is incorrect");
          email.setError("Email or password is incorrect");
        } else {
          showError("Phone number or password is incorrect");
          phone.setError("Phone number or password is incorrect");
        }
      } else if (error?.response?.status === 401) {
        showError("Unauthorized. Pleaser verify your account");
      } else {
        showError("Something went wrong. Please try again.");
      }
    }

    if (response?.status_code === 202) {
      navigate("/verifyOTP");
    }
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      console.log("Form is invalid");
      return;
    }

    let formData: any = {
      password: password.value,
    };

    if (signupMethod === "email") {
      formData = { ...formData, email: email.value };
      console.log("Data", formData);
    } else if (signupMethod === "phone") {
      // remove leading 0 from phone number (E.164 format)
      const phoneWithoutLeadingZero = phone.value.replace(/^0+/, "");

      formData = {
        ...formData,
        phoneNumber: selectedCountry.dialCode + phoneWithoutLeadingZero,
      };
      console.log("Data", formData);
    }

    await login(signupMethod, formData);
  };

  const handleFacebookOauth = async () => {
    const response = await authApi.googleOauth();
    console.log("## ", response);
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
                  <a href="" style={{ color: "red", textDecoration: "none" }}>
                    {" "}
                    Sign Up today
                  </a>
                </CP.Typography>
              )}
              <Tabs
                sx={{ alignSelf: !isMobile ? "flex-start" : "center" }}
                value={activeTabIndex}
                onChange={(e, value) => handleSignupMethodChange(e, value)}
                aria-label="signup options"
              >
                <Tab label="With Email" />
                <Tab label="With Phone" />
              </Tabs>
              {signupMethod === "email" ? (
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
                  <img
                    style={{ width: "36px", height: "36px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
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
              <CP.Button fullWidth type="submit" onClick={handleSubmit}>
                Login
              </CP.Button>
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
                    margin: "1rem 0",
                  }}
                >
                  OR
                </CP.Typography>
              )}

              {!isMobile && (
                <Flex direction="row" gap="40px" margin="1rem">
                  <img
                    onClick={handleFacebookOauth}
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
