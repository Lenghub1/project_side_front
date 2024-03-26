import { useNavigate, useLocation, Outlet } from "react-router-dom";
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
import { VERIFICATION_TYPE } from "../verifications/OTP";
import useCancelModal from "@/hooks/useCancelModal";
import useScreenSize from "@/hooks/useScreenSize";
import useAuth from "@/hooks/useAuth";
import { useResetRecoilState } from "recoil";
import { resetPasswordToken } from "@/store/userStore";

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
  const { response, isSuccess, error, handleApiRequest } = useApi();
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const { enqueueSnackbar } = useSnackbar();
  const { response, error, isError, isSuccess, handleApiRequest } = useApi();
  const { resetToken } = useAuth();
  const resetTokenState = useResetRecoilState(resetPasswordToken);

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

  async function forgetPassword(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.forgotPassword(method, data));
  }
  useEffect(() => {
    if (!resetToken) {
      navigate("/login");
    }
  }, [resetToken]);

  useEffect(() => {
    if (isError) {
      showMessage("Failed to reset password. Please try again", "error");

      return;
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      if (resetPasswordBy === "phone") {
        showMessage(
          `OTP has been sent to ${selectedCountry.dialCode} ${phone.value}`,
          "success"
        );
        setTimeout(() => {
          navigate("/forget-password/verify-otp", {
            state: {
              type: VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD,
              phone: `${selectedCountry.dialCode} ${phone.value}`,
            },
          });
        }, 1500);
      } else {
        showMessage(
          `Reset password verification link has been sent. Please check your email and verify`,
          "success"
        );
      }
    }
  }, [response, isSuccess]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      return;
    }

    let formData: any = {};

    if (resetPasswordBy === "email") {
      formData = { ...formData, email: email.value };
    } else if (resetPasswordBy === "phone") {
      // remove leading 0 from phone number (E.164 format)
      const phoneWithoutLeadingZero = phone.value.replace(/^0+/, "");

      formData = {
        ...formData,
        phoneNumber: selectedCountry.dialCode + phoneWithoutLeadingZero,
      };
    }

    await forgetPassword(resetPasswordBy, formData);
  };
  return (
    <>
      {isForgetPasswordRoute ? (
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
                  {`Enter your ${resetPasswordBy}  below and we\'ll send you password reset ${resetPasswordBy === "email" ? "token" : "OTP"}
                  .`}
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

                  <CP.Styled.Flex width="100%" justify="flex-start">
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
                  <Flex width="100%" justify="flex-end" gap="20px">
                    <CP.Button variant="text" onClick={handleModalOpen}>
                      Cancel
                    </CP.Button>
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
          <CP.Modal
            open={open}
            onClose={handleCloseModal}
            type="confirm"
            onOk={handleCancelConfirm}
            okText={"Yes"}
            cancelText="NO"
          >
            <CP.Styled.Flex direction="column" items="flex-start" gap="1rem">
              <CP.Typography variant="h6">
                Canceling reset password?
              </CP.Typography>
              <CP.Typography> Are you sure to cancel it now?</CP.Typography>
            </CP.Styled.Flex>
          </CP.Modal>
        </CP.Styled.Wrapper>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ForgetPassword;
