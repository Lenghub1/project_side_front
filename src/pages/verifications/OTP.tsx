import { useEffect, useState, SyntheticEvent, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CP from "@/components";
import { authApi } from "@/api/auth";
import useApi from "@/hooks/useApi";
import { maskPhoneNumber } from "../forgotAccount/AccountList";
import useCancelModal from "@/hooks/useCancelModal";
import useScreenSize from "@/hooks/useScreenSize";
import { useSetRecoilState } from "recoil";
import Store from "@/store";
import { Flex } from "../getStarted/GetStarted";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useCooldownTimer from "@/hooks/useCooldownTimer";
import useMessageDisplay from "@/hooks/useMessageDisplay";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
    },
  },
});

interface VERIFY_DATA {
  resetToken?: string;
  phoneNumber?: string;
  code?: string;
  OTP?: string;
  credential?: string;
  loginMethod?: string;
}

export const VERIFICATION_TYPE = {
  VERIFY_ACCOUNT: "signup",
  VERIFY_FORGET_PASSWORD: "forgetPassword",
  VERIFY_2FA: "2FA",
};

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { response, isSuccess, error, handleApiRequest } = useApi();
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const { isMobile } = useScreenSize();
  const { isCooldown, cooldownTime, startCooldown } = useCooldownTimer(30);
  const showMessage = useMessageDisplay();
  const [otp, setOtp] = useState("");
  const setResetPassword = useSetRecoilState(Store.User.resetPasswordToken);
  const setAccessToken = useSetRecoilState(Store.User.accessTokenState);
  const [isError, setError] = useState<boolean>();
  const isValidInput = otp.length === 6;

  const verification = location.state;

  useEffect(() => {
    if (error) {
      showMessage("Incorrect code. Please try again", "error");
      setError(true);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess && response) {
      if (response.status_code === 200) {
        showMessage(
          "OTP has been resent. Please check your phone and verify",
          "success"
        );
        return;
      }
      if (verification.type === VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD) {
        showMessage(
          "OTP code verified successfully. You can now reset your password.",
          "success"
        );
        setResetPassword(true);
        setTimeout(() => {
          navigate("/forget-password/reset-password");
        }, 1500);
      } else if (
        verification.type === VERIFICATION_TYPE.VERIFY_ACCOUNT ||
        verification.type === VERIFICATION_TYPE.VERIFY_2FA
      ) {
        setAccessToken(response.data.accessToken);
        navigate("/login/choose-organization");
      }
    }
  }, [response, isSuccess]);

  useEffect(() => {
    if (otp.length === 6) {
      console.log("INPUT", isValidInput);
      submitOtp();
    }
  }, [otp.length === 6]);

  const verifyOTP = useCallback(async (data: any): Promise<void> => {
    if (verification.type === VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD) {
      await handleApiRequest(() => authApi.verifyForgetPasswordToken(data));
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_ACCOUNT) {
      await handleApiRequest(() => authApi.verifyPhoneNumber(data));
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
      await handleApiRequest(() => authApi.verify2FA(data));
    }
  }, []);

  async function resendOTP(): Promise<void> {
    setOtp("");
    setError(false);
    startCooldown();
    if (verification.type === VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD) {
      await handleApiRequest(() =>
        authApi.forgotPassword(verification.method, verification.data)
      );
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_ACCOUNT) {
      await handleApiRequest(() =>
        authApi.resendActivationCode(verification.method, verification.data)
      );
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
      const data =
        verification.loginMethod === "email"
          ? { email: verification.credential }
          : { phoneNumber: verification.credential };
      authApi.resendTwoFactorCode(verification.loginMethod, data);
    }
  }

  const matchIsString = (text: any) => {
    return typeof text === "string" || text instanceof String;
  };

  function matchIsNumeric(text: string) {
    const isNumber = typeof text === "number";
    const isString = matchIsString(text);
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  }

  const submitOtp = async () => {
    setError(false);
    let data = {} as VERIFY_DATA;

    if (verification.type === VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD) {
      data = {
        resetToken: otp,
      };
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_ACCOUNT) {
      data = {
        phoneNumber: verification.data.phoneNumber,
        code: otp,
      };
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
      data = {
        OTP: otp,
        credential: verification.credential,
        loginMethod: verification.loginMethod,
      };
    }

    if (!isError && isValidInput) {
      await verifyOTP(data);
    }
  };

  const validateChar = (value: string, index: number) => {
    return matchIsNumeric(value);
  };

  const handleChangeOtp = async (newValue: string) => {
    setError(false);
    setOtp(newValue);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (isValidInput) {
      submitOtp();
    }
  };

  return (
    <CP.Styled.Wrapper height="100vh">
      <CP.Styled.Form>
        <Flex height="inherit">
          <CP.Styled.Div padding={!isMobile ? "0" : "0 1rem"}>
            <Flex items="flex-start" direction="column">
              <CP.Typography
                variant="h4"
                margin="0 0 1rem"
                textAlign="center"
                width={"100%"}
              >
                OTP Verification
              </CP.Typography>
              <Flex direction="column">
                <CP.Typography
                  fontWeight="semibold"
                  textAlign="center"
                  gutterBottom
                >
                  Enter the verification code we just sent to your
                </CP.Typography>

                {verification.phone ? (
                  <CP.Typography marginBottom={"2rem"}>
                    phone number{verification.phone.slice(0, 7)}
                    {maskPhoneNumber(verification.phone).slice(7)}.
                  </CP.Typography>
                ) : (
                  verification.email && (
                    <CP.Typography marginBottom={"2rem"}>
                      email "{verification.email}"
                    </CP.Typography>
                  )
                )}
              </Flex>
              <ThemeProvider theme={customTheme}>
                <CP.OTPComponent
                  setError={setError}
                  gap={1}
                  length={6}
                  inputWidth="40px"
                  inputHeight="40px"
                  value={otp}
                  onChange={handleChangeOtp}
                  TextFieldsProps={{
                    variant: "outlined",
                    error: isError,
                  }}
                  validateChar={validateChar}
                  autoFocus
                />
                {/* <MuiOtpInputStyled
                  gap={1}
                  length={6}
                  value={otp}
                  onChange={handleChangeOtp}
                  TextFieldsProps={{
                    variant: "outlined",
                    error: isError,
                  }}
                  validateChar={validateChar}
                  autoFocus
                /> */}
              </ThemeProvider>
              <Flex
                direction="column"
                gap="24px"
                overflow="unset"
                margin="16px"
              >
                <Flex>
                  <CP.Typography marginRight={1}>
                    Didn't receive code?{" "}
                  </CP.Typography>
                  <CP.Button
                    onClick={() => resendOTP()}
                    disabled={isCooldown}
                    variant="text"
                  >
                    {isCooldown ? `Resend (${cooldownTime})` : "Resend"}
                  </CP.Button>
                </Flex>
                <Flex>
                  <Flex gap="0.5rem" justify="center">
                    <CP.Button variant="text" onClick={handleModalOpen}>
                      cancel
                    </CP.Button>
                    <CP.Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={!isValidInput}
                    >
                      Verify
                    </CP.Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </CP.Styled.Div>
        </Flex>
      </CP.Styled.Form>
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
            Canceling Resetting Password?
          </CP.Typography>
          <CP.Typography> Are you sure to cancel it now?</CP.Typography>
        </CP.Styled.Flex>
      </CP.Modal>
    </CP.Styled.Wrapper>
  );
};

export default OTP;
