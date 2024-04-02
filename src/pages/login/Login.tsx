import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import CP from "@/components";

import { useEffect, useState } from "react";
import useValidatedInput from "@/hooks/useValidatedInput";
import { authApi } from "@/api/auth";
import { SyntheticEvent } from "react";
import countries from "@/components/phonePrefix/countries.json";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Store from "@/store";
import OauthComponent from "@/components/oauth/OauthComponent";
import useApi from "@/hooks/useApi";
import useScreenSize from "@/hooks/useScreenSize";
import { FormContainer, Title } from "../companySearch/CompanySearch";
import SignupMethod from "@/components/signupMethod/SignupMethod";
import SpaWithImage from "@/components/spaWithImage/SpaWithImage";
import { validateEmail } from "../signup/Signup";
import Loading from "@/components/loading/Loading";
import { VERIFICATION_TYPE } from "../verifications/OTP";
import { removeLeadingZeron } from "@/utils/commonUtil";
import { Flex } from "../getStarted/GetStarted";

type SignInMethod = "email" | "phone";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { enqueueSnackbar } = useSnackbar();
  const [loginMethod, setLoginMethod] = useState<SignInMethod>("email");
  const email = useValidatedInput("", "Email", validateEmail);
  const phone = useValidatedInput("", "Phone");
  const password = useValidatedInput("", "Password");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    dialCode: string;
    flag: string;
  }>(countries[0]);
  const setAccessToken = useSetRecoilState(Store.User.accessTokenState);
  const { isMobile } = useScreenSize();

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
  const { response, isLoading, error, isSuccess, handleApiRequest } = useApi();
  // function for login api
  async function login(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.testLogin(method, data));
  }

  useEffect(() => {
    if (isSuccess) {
      const userData = response?.data;
      if (response?.status_code === 202) {
        if (loginMethod === "email") {
          navigate("/login/verify-2fa", {
            state: {
              type: VERIFICATION_TYPE.VERIFY_2FA,
              email: email.value,
              loginMethod: loginMethod,
              credential: email.value,
            },
          });
        } else if (loginMethod === "phone") {
          navigate("/login/verify-2fa", {
            state: {
              type: VERIFICATION_TYPE.VERIFY_2FA,
              phoneNumber: `${selectedCountry.dialCode} ${removeLeadingZeron(phone.value)}`,
              loginMethod: "phoneNumber",
              credential:
                selectedCountry.dialCode + removeLeadingZeron(phone.value),
            },
          });
        }
      }
      if (userData?.user) {
        setAccessToken(userData.user?.accessToken);
        navigate("/");
      }
    }
  }, [response, isSuccess]);

  useEffect(() => {
    if (error) {
      if (error?.statusCode === 400) {
        showMessage(
          `${loginMethod === "email" ? "Email" : "Phone number"} or password is incorrect`,
          "error"
        );
      } else if (error.statusCode === 401) {
        if (loginMethod === "email") {
          navigate("/get-started/activate-account", {
            state: {
              credential: email.value,
              accountMethod: loginMethod,
            },
          });
        } else {
          navigate("/get-started/verify-phone", {
            state: {
              type: VERIFICATION_TYPE.VERIFY_ACCOUNT,
              phoneNumber: `${selectedCountry.dialCode} ${removeLeadingZeron(phone.value)}`,
              method: loginMethod,
              data: {
                phoneNumber:
                  selectedCountry.dialCode + removeLeadingZeron(phone.value),
              },
            },
          });
        }
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

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <SpaWithImage>
      {isLoginPage ? (
        <CP.Styled.Form>
          <FormContainer>
            <CP.Styled.Div>
              <CP.Typography
                variant="h5"
                width={"100%"}
                marginBottom={"1rem"}
                textAlign={"start"}
              >
                Welcome back
              </CP.Typography>
              <Title>Login</Title>
              <Flex direction="column" gap="1.5rem">
                <SignupMethod
                  email={email}
                  phone={phone}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  signupMethod={loginMethod}
                  setSignupMethod={setLoginMethod}
                />

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
                      <IconButton
                        onClick={() => setIsPassword((prev) => !prev)}
                      >
                        {isPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
                <CP.Styled.Div>
                  <Link to={"/forget-password"}>Forget password?</Link>
                </CP.Styled.Div>
                <OauthComponent margin="0" />
                <CP.Button
                  fullWidth
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isFormInvalid}
                >
                  Login
                </CP.Button>

                <CP.Typography align={isMobile ? "center" : "left"}>
                  Don't have an account? <Link to={"/get-started"}>Signup</Link>
                </CP.Typography>
                <CP.Button variant="text">
                  Login Using Face Recognition
                </CP.Button>
              </Flex>
            </CP.Styled.Div>
          </FormContainer>
        </CP.Styled.Form>
      ) : (
        <Outlet />
      )}
    </SpaWithImage>
  );
};

export default LoginPage;
