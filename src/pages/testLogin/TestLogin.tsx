import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { authApi } from "@/api/auth";
import useValidatedInput from "@/hooks/useValidatedInput";
import { SyntheticEvent, useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import countries from "@/components/phonePrefix/countries.json";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import useApi from "@/hooks/useApi";

export const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const Divider = styled(MuiDivider)`
  width: 100%;
`;

type LoginMethod = "email" | "phone";

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

const TestLoginPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const email = useValidatedInput("", "Email", validateEmail);
  const phone = useValidatedInput("", "Phone");
  const password = useValidatedInput("", "Password");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    dialCode: string;
    flag: string;
  }>(countries[0]);
  const activeTabIndex = loginMethod === "email" ? 0 : 1;

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const handleLoginMethodChange = (event: SyntheticEvent, newValue: number) => {
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

  function showError(message: string) {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }

  const { response, isError, error, handleApiRequest } = useApi();

  async function login(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.testLogin(method, data));

    // if (response && response.data && response.data.user) {
    //   console.log(response);
    //   setAccessToken(response.data.user.accessToken);
    //   navigate("/campus");
    // } else if (error) {
    //   if (error?.response?.status === 400) {
    //     showError(
    //       `${loginMethod === "email" ? "Email" : "Phone number"} or password is incorrect`
    //     );
    //   } else {
    //     showError("Something went wrong. Please try again.");
    //   }
    // }
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
      console.log(error.message);
      if (error.statusCode === 422) {
        showError(
          `${loginMethod === "email" ? "Email" : "Phone number"} or password is incorrect`
        );
      } else {
        showError("Something went wrong. Please try again.");
      }
    }
  }, [error]);

  const isFormInvalid: boolean =
    loginMethod === "email"
      ? !email.value || !!email.error
      : !phone.value || !!phone.error;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      console.log("Form is invalid");
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
  console.log("MY ACCESS TOKEN", accessToken);

  return (
    <CP.Styled.Wrapper height="100vh" padding="0">
      <Flex height="100%">
        <CP.Styled.Div padding="0 1rem">
          <CP.Styled.Form>
            <Flex items="flex-start" padding="0 3rem" direction="column">
              <CP.Typography
                variant="h4"
                style={{
                  marginBottom: "2rem",
                  fontWeight: "semibold",
                  textAlign: "start",
                }}
              >
                Login
              </CP.Typography>

              <Flex direction="column" gap="1.5rem">
                <Tabs
                  sx={{ alignSelf: "flex-start" }}
                  value={activeTabIndex}
                  onChange={(e, value) => handleLoginMethodChange(e, value)}
                  aria-label="login options"
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
                  type={passwordIsVisible ? "text" : "password"}
                  value={password.value}
                  onChange={password.onChange}
                  onBlur={password.onBlur}
                  error={!!password.error}
                  helperText={<password.HelperText />}
                  required
                  InputProps={{
                    autoComplete: "new-password",
                    endAdornment: (
                      <IconButton
                        onClick={() => setPasswordIsVisible((prev) => !prev)}
                      >
                        {passwordIsVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />

                <Divider></Divider>
                <Flex gap="1rem">
                  <CP.Button type="submit" onClick={handleSubmit} fullWidth>
                    Login
                  </CP.Button>
                </Flex>
                <CP.Typography variant="subtitle2">
                  By signing up, you agree to our{" "}
                  <NavLink to="#">Terms of Service</NavLink> &{" "}
                  <NavLink to="#">Privacy Policy</NavLink>
                </CP.Typography>
              </Flex>
            </Flex>
            <Flex direction="column" margin="1rem 0 0" gap="1rem">
              <Divider></Divider>
              <CP.Typography>
                Already have an account? <NavLink to="#">Login here</NavLink>
              </CP.Typography>
            </Flex>
          </CP.Styled.Form>
        </CP.Styled.Div>
        <CP.Styled.Div height="100%">
          <Flex>
            <Box
              component="img"
              src="/random-unsplash.jpg"
              alt="Random image"
              sx={{
                width: 1,
                height: "100vh",
                objectFit: "cover",
              }}
            />
          </Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default TestLoginPage;
