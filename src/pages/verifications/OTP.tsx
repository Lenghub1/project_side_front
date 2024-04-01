import { useEffect, useState, SyntheticEvent, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import CP from "@/components";
import { authApi } from "@/api/auth";
import { useSnackbar } from "notistack";
import useApi from "@/hooks/useApi";
import { maskPhoneNumber } from "../forgotAccount/AccountList";
import useCancelModal from "@/hooks/useCancelModal";
import useScreenSize from "@/hooks/useScreenSize";
import { useSetRecoilState } from "recoil";
import Store from "@/store";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Flex } from "../getStarted/GetStarted";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
    },
  },
});
const MuiOtpInputStyled = styled(MuiOtpInput)`
  width: auto;
  margin-inline: auto;
  .MuiOtpInput-TextField {
    width: 40px !important;
    height: 40px !important;
    color: secondary;
    & .MuiInputBase-root {
      height: 40px !important;
      font-size: 1.2rem;
    }
  }
`;

const OTPContainer = CP.Styled.Flex;

const OTPInput = styled.input`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

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
  const { enqueueSnackbar } = useSnackbar();

  const [otp, setOtp] = useState("");
  const setResetPassword = useSetRecoilState(Store.User.resetPasswordToken);
  const setAccessToken = useSetRecoilState(Store.User.accessTokenState);

  const isValidInput = otp.length === 6;
  const verification = location.state;

  console.log(location.state);

  useEffect(() => {
    if (error) {
      showMessage("Incorrect code. Please try again", "error");
    }
  }, [error]);

  useEffect(() => {
    console.log("RESPONSE", response);

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
      } else if (verification.type === VERIFICATION_TYPE.VERIFY_ACCOUNT) {
        console.log("VERIFY", verification);
      } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
        setAccessToken(response.data.accessToken);
        navigate("/login/choose-organization");
      }
    }
  }, [response, isSuccess]);

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
    if (verification.type === VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD) {
      await handleApiRequest(() =>
        authApi.forgotPassword(verification.method, verification.data)
      );
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_ACCOUNT) {
      await handleApiRequest(() =>
        authApi.resendActivationCode(verification.method, verification.data)
      );
    }
  }

  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }
  const matchIsString = (text: any) => {
    return typeof text === "string" || text instanceof String;
  };

  function matchIsNumeric(text: string) {
    const isNumber = typeof text === "number";
    const isString = matchIsString(text);
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  }

  const validateChar = (value: string, index: number) => {
    return matchIsNumeric(value);
  };

  const handleChangeOtp = (newValue: string) => {
    setOtp(newValue);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    let data = {} as VERIFY_DATA;

    if (verification.type === VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD) {
      data = {
        resetToken: otp,
      };
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_ACCOUNT) {
      data = {
        phoneNumber: verification.phoneNumber,
        code: otp,
      };
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
      data = {
        OTP: otp,
        credential: verification.credential,
        loginMethod: verification.loginMethod,
      };
    }

    await verifyOTP(data);
  };

  return (
    <CP.Styled.Wrapper height="100vh">
      <Flex height="inherit">
        <CP.Styled.Div padding={!isMobile ? "0" : "0 16px"}>
          <Flex items="flex-start" direction="column">
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              textAlign="center"
              width={"100%"}
            >
              OTP Verification
            </CP.Typography>
            <Flex direction="column">
              <CP.Typography fontWeight="semibold" textAlign="center">
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
              <MuiOtpInputStyled
                gap={1}
                length={6}
                value={otp}
                onChange={handleChangeOtp}
                TextFieldsProps={{ variant: "outlined" }}
                sx={{ color: "slateblue" }}
                validateChar={validateChar}
              />
            </ThemeProvider>
            <Flex direction="column" gap="24px" overflow="unset" margin="16px">
              <Flex>
                <CP.Typography marginRight={1}>
                  Didn't receive code?{" "}
                </CP.Typography>
                <CP.Typography
                  fontWeight="semibold"
                  color={"primary"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => resendOTP()}
                >
                  Resend
                </CP.Typography>
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
