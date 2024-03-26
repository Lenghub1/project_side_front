import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  BaseSyntheticEvent,
  ClipboardEvent,
  SyntheticEvent,
  useCallback,
} from "react";
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

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
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
  const { isMobile } = useScreenSize();
  const [arrayValue, setArrayValue] = useState<(string | number)[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [maskedValue, setMaskedValue] = useState<(string | number)[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const { enqueueSnackbar } = useSnackbar();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const isValidInput = arrayValue.every((value) => value !== "");
  const { response, isSuccess, error, handleApiRequest } = useApi();
  const verification = location.state;
  const setResetPassword = useSetRecoilState(Store.User.resetPasswordToken);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (error) {
      console.log("ERROR", error);
      showMessage("ERRROR" + error?.statusCode, "error");
      setArrayValue(Array(6).fill("")); // Reset input values to empty string
      inputs.current[5]?.focus();
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
        // navigate to home
      } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
        //navigate to home
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
    await handleApiRequest(() =>
      authApi.forgotPassword(verification.method, verification.data)
    );
  }

  // handle pasting OTP code
  const handleOnPaste = (e: ClipboardEvent, index: number) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").split("");
    let newInputValue = [...arrayValue];
    let newMaskedValue = [...maskedValue];
    let currentIndex = index;
    for (let i = 0; i < paste.length; i++) {
      if (currentIndex < arrayValue.length) {
        newInputValue[currentIndex] = paste[i];
        newMaskedValue[currentIndex] = "*";
        currentIndex++;
      }
    }
    setArrayValue(newInputValue);
    setMaskedValue(newMaskedValue);

    // Focus the next input after pasting
    const nextIndex = Math.min(index + paste.length, arrayValue.length - 1);
    inputs.current[nextIndex]?.focus();
  };

  // on change
  const handleChange = (e: BaseSyntheticEvent, index: number) => {
    const input = e.target.value;
    if (!isNaN(input)) {
      setArrayValue((preValue: (string | number)[]) => {
        const newArray = [...preValue];
        newArray[index] = input;
        return newArray;
      });

      setMaskedValue((prevValue: (string | number)[]) => {
        const newArray = [...prevValue];
        newArray[index] = "*";
        return newArray;
      });

      if (input !== "" && index < arrayValue.length - 1) {
        inputs.current[index + 1]?.focus();
        inputs.current[index + 1]?.select();
      }

      if (arrayValue.every((value) => value !== "")) {
        arrayValue.every((value) => {
          console.log(value);
        });
      }
    }
  };
  //handle on key up
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setArrayValue((prevValue: (string | number)[]) => {
        const newArray = [...prevValue];
        newArray[index] = "";
        return newArray;
      });

      setMaskedValue((prevValue: (string | number)[]) => {
        const newArray = [...prevValue];
        newArray[index] = "";
        return newArray;
      });

      if (index > 0) {
        console.log("MY INDEX", index);
        inputs.current[index - 1]?.focus();
        inputs.current[index - 1]?.select();
      }
    }
  };

  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const keyCode = parseInt(e.key);
    console.log("KEYYY CODE", e.key);
    if (
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !(e.metaKey && e.key === "v") &&
      !(keyCode >= 0 && keyCode <= 9)
    ) {
      e.preventDefault();
      inputs.current[index - 1]?.focus();
      inputs.current[index - 1]?.select();
    }
    if (e.key === "ArrowLeft") {
      inputs.current[index - 1]?.focus();
      inputs.current[index - 1]?.select();
    }
    if (e.key === "ArrowRight") {
      inputs.current[index + 1]?.focus();
      inputs.current[index + 1]?.select();
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    let data = {} as VERIFY_DATA;

    if (verification.type === VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD) {
      data = {
        resetToken: arrayValue.join(""),
      };
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
      data = {
        phoneNumber: verification.phoneNumber,
        code: arrayValue.join(""),
      };
    } else if (verification.type === VERIFICATION_TYPE.VERIFY_2FA) {
      data = {
        OTP: arrayValue.join(""),
        credential: verification.credential,
        loginMethod: verification.loginMethod,
      };
    }
    console.log("VALUE", arrayValue.join(""));

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
              <CP.Typography marginBottom={"2rem"}>
                phone number{verification.phone.slice(0, 7)}
                {maskPhoneNumber(verification.phone).slice(7)}.
              </CP.Typography>
            </Flex>
            <OTPContainer>
              {maskedValue.map((value: string | number, index: number) => (
                <OTPInput
                  key={`index-${index}`}
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handleOnPaste(e, index)}
                  maxLength={1}
                  autoComplete="off"
                  accessKey={String(index)}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                />
              ))}
            </OTPContainer>
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
              <Flex gap={"100px"} width="100%" justify="center">
                <Flex width="400px" justify="flex-end">
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
