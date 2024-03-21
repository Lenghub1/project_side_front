import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useCriteriaValidator from "@/hooks/useCriteriaInput.tsx";
import useMatchInput from "@/hooks/useMatchInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { SyntheticEvent } from "react";
import { authApi } from "@/api/auth";
import Store from "@/store";
import { useSnackbar } from "notistack";
import useApi from "@/hooks/useApi";
import useCancelModal from "@/hooks/useCancelModal";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const passwordCriteria = {
  length: { min: 8, max: 25 },
  containsNumber: true,
  containsCapitalLetter: true,
  containsLowercaseLetter: true,
  // containsSpecialCharacter: true,
};

const ResetPassword = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);

  console.log("Window asdasd", window.screen.width);
  const password = useCriteriaValidator("", passwordCriteria);
  const confirmPassword = useMatchInput(password.value, "", "Confirm Password");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useRecoilState(
    Store.User.resetPasswordToken
  );
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const { enqueueSnackbar } = useSnackbar();
  const { response, isError, isSuccess, handleApiRequest } = useApi();
  const isFormInvalid =
    !password.value ||
    password.errors.length !== 0 ||
    !confirmPassword.value ||
    !!confirmPassword.error;

  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }

  async function logOut() {
    await handleApiRequest(() => authApi.logout());
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("TOKEN", resetPasswordToken);
    if (!resetPasswordToken) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (isError) {
      showMessage("Failed to reset password. Please try again", "success");
    }
  }, [isError]);

  useEffect(() => {
    if (response) {
      console.log("Response", response);
      return;
    }
    if (isSuccess) {
      showMessage("Password has been successfully reset.", "success");
      setTimeout(async () => {
        await logOut();
      }, 1500);
    }
  }, [isSuccess, response]);

  async function resetPassword(newPassword: string) {
    await handleApiRequest(() => authApi.resetPassword(newPassword));
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    await resetPassword(password.value);
  };

  return (
    <CP.Styled.Wrapper height="100vh">
      <Flex height="inherit">
        <CP.Styled.Div padding={!isMobile ? "0 1rem" : "0 16px"} width="600px">
          <Flex direction="column" padding={!isMobile ? "0 3rem" : "0px"}>
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              textAlign="start"
              width={"100%"}
            >
              New Password
            </CP.Typography>
            <Flex direction="column" justify-content="start">
              <CP.Typography
                fontWeight="semibold"
                width={"100%"}
                textAlign={"start"}
              >
                Please enter and confirm your new password
              </CP.Typography>
              <CP.Typography
                fontWeight="semibold"
                width={"100%"}
                textAlign={"start"}
                marginBottom={"2rem"}
              >
                Minimum of 8 characters.
              </CP.Typography>
            </Flex>
            <Flex direction="column" gap="24px" overflow="unset">
              <Flex gap={"16px"} direction="column">
                <CP.Input
                  label="Password"
                  type={passwordIsVisible ? "text" : "password"}
                  value={password.value}
                  onChange={password.onChange}
                  onBlur={password.onBlur}
                  error={password.errors.length > 0}
                  helperText={<password.HelperText />}
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setPasswordIsVisible((prev) => !prev)}
                      >
                        {passwordIsVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />

                <CP.Input
                  label="Confirm password"
                  type={confirmPasswordIsVisible ? "text" : "password"}
                  value={confirmPassword.value}
                  onChange={confirmPassword.onChange}
                  onBlur={confirmPassword.onBlur}
                  error={!!confirmPassword.error}
                  helperText={<confirmPassword.HelperText />}
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setConfirmPasswordIsVisible((prev) => !prev)
                        }
                      >
                        {confirmPasswordIsVisible ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Flex>

              <Flex justify="flex-end" gap="20px">
                <CP.Button variant="text" onClick={handleModalOpen}>
                  Cancel
                </CP.Button>
                <CP.Button
                  disabled={isFormInvalid}
                  type="submit"
                  onClick={handleSubmit}
                >
                  SAVE
                </CP.Button>
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

export default ResetPassword;
