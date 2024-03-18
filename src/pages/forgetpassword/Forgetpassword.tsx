import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useValidatedInput from "@/hooks/useValidatedInput";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import countries from "@/components/phonePrefix/countries.json";
import { SyntheticEvent } from "react";
import { useSnackbar } from "notistack";
import { authApi } from "@/api/auth";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useApi from "@/hooks/useApi";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

type FindPasswordMethod = "email" | "phone";

const validateEmail = (email: string): string => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const email = useValidatedInput("", "Email", validateEmail);
  const phone = useValidatedInput("", "Phone");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    dialCode: string;
    flag: string;
  }>(countries[0]);
  const [resetPasswordBy, setResetPasswordBy] =
    useState<FindPasswordMethod>("email");
  const activeTabIndex = resetPasswordBy === "email" ? 0 : 1;

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

  const handleResetPasswordBy = (event: SyntheticEvent, newValue: number) => {
    const method = newValue === 0 ? "email" : "phone";
    if (method === "phone" && email.touched) {
      email.setTouched(false);
      if (email.value) email.setValue("");
    } else if (method === "email" && phone.touched) {
      phone.setTouched(false);

      if (phone.value) phone.setValue("");
    }
    setResetPasswordBy(method);
    console.log("Method", resetPasswordBy);
  };

  const isFormInvalid =
    resetPasswordBy === "phone"
      ? !phone.value || !!phone.error
      : !email.value || !!email.error;

  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }

  const { response, isError, isLoading, isSuccess, error, handleApiRequest } =
    useApi();
  async function forgetPassword(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.forgotPassword(method, data));

    if (!isError) {
      console.log("Error");
      if (method === "phone") {
        showMessage(`OTP has been sent to ${data.phoneNumber}`, "success");
      } else {
        showMessage(
          `Verifiation code has been sent. Please your email and verify`,
          "success"
        );
      }
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
    }
  }

  useEffect(() => {
    if (error) {
      console.log("THE ERROR is", error);
      showMessage(
        `No results were found. Please check your ${
          resetPasswordBy === "phone" ? "phone number" : "email"
        } and try again.`,
        "error"
      );

      return;
    }
  }, [error]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      console.log("Form is invalid");
      return;
    }

    let formData: any = {};

    if (resetPasswordBy === "email") {
      formData = { ...formData, email: email.value };
      console.log("Data", formData);
    } else if (resetPasswordBy === "phone") {
      // remove leading 0 from phone number (E.164 format)
      const phoneWithoutLeadingZero = phone.value.replace(/^0+/, "");

      formData = {
        ...formData,
        phoneNumber: selectedCountry.dialCode + phoneWithoutLeadingZero,
      };
      console.log("Data", formData);
    }

    await forgetPassword(resetPasswordBy, formData);
  };

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
              <Tabs
                sx={{ alignSelf: !isMobile ? "flex-start" : "center" }}
                value={activeTabIndex}
                onChange={(e, value) => handleResetPasswordBy(e, value)}
                aria-label="signup options"
              >
                <Tab label="With Email" />
                <Tab label="With Phone" />
              </Tabs>
              {resetPasswordBy === "email" ? (
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

              <CP.Styled.Flex width="100%" justify="start">
                <CP.Typography
                  margin="1rem 0"
                  color="red"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/forgot-account");
                  }}
                >
                  Forget account?
                </CP.Typography>
              </CP.Styled.Flex>
              <Flex width="100%" justify="end" gap="20px">
                <CP.Button variant="text">Cancel</CP.Button>
                <CP.Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isFormInvalid}
                >
                  Find
                </CP.Button>
              </Flex>
            </Flex>
          </Flex>
        </CP.Styled.Div>
        {!isMobile && (
          <CP.Styled.Div height="100%">
            <Flex style={{ height: "100%" }}>
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
        )}
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default ForgetPassword;
