import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import useValidatedInput from "@/hooks/useValidatedInput";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SyntheticEvent } from "react";
import { useSnackbar } from "notistack";
import { authApi, testApi } from "@/api/auth";
import { handleApiRequest } from "@/api";
import { Outlet } from "react-router-dom";
import useCancelModal from "@/hooks/useCancelModal";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

export const Typography = ({ children, screen }: any) => {
  return (
    <CP.Typography
      variant="h4"
      margin="0 0 2rem"
      style={{
        fontWeight: "semibold",
        textAlign: screen ? "center" : "start",
        width: "100%",
      }}
    >
      {children}
    </CP.Typography>
  );
};

const ForgotAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);
  const username = useValidatedInput("", "Username");
  const companyCode = useInput("");
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const isForgotAccountRoute = location.pathname === "/forgot-account";
  useEffect(() => {
    console.log("Company code", companyCode);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };
    console.log("Window size", window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [companyCode]);

  const isFormIvalid =
    !username.value ||
    !!username.error ||
    function showError(message: string) {
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom", // or 'bottom'
          horizontal: isMobile ? "center" : "left", // or 'left', 'center'
        },
      });
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

  async function forgotAccount(data: any): Promise<void> {
    const [response, error] = await handleApiRequest(() =>
      authApi.findForgotAccount(data)
    );

    if (error) {
      showMessage("Not results exist. Please try again!", "error");
    }

    if (response.status_code === 200) {
      // set state
      navigate("/forgot-account/informations");
    }
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const fullName = username.value.split(" ").filter(Boolean);
    let data = {
      firstName: fullName[0],
      lastName: fullName[1],
      orgId: companyCode.value,
    };
    await forgotAccount(data);
  };

  const isInvalid = !username.value && !!username.setError;

  return (
    <>
      {isForgotAccountRoute ? (
        <CP.Styled.Wrapper height="100vh">
          <Flex height="inherit">
            <CP.Styled.Div
              minwidth={isMobile ? "396px" : "565px"}
              padding={!isMobile ? "0 1rem" : "0 16px"}
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
                  Find Account
                </CP.Typography>
                <CP.Typography
                  style={{
                    marginBottom: "2rem",
                    fontWeight: "semibold",
                    textAlign: isMobile ? "start" : "start",
                    width: "100%",
                  }}
                >
                  Enter your username and company code to find your account.
                </CP.Typography>
                <Flex direction="column" gap="24px" overflow="unset">
                  <CP.Input
                    label="Username"
                    value={username.value}
                    onChange={username.onChange}
                    onBlur={username.onBlur}
                    error={!!username.error}
                    helperText={<username.HelperText />}
                    required
                  />
                  <CP.Input
                    label="Company code"
                    value={companyCode.value}
                    onChange={companyCode.onChange}
                    required
                    inputProps={{ maxLength: 6 }}
                  />

                  <CP.Styled.Flex width="100%" justify="flex-start">
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
                  {/* {companyCode && <h1>{comp}</h1>} */}
                  <Flex width="100%" justify="flex-end" gap="20px">
                    <CP.Button variant="text" onClick={handleModalOpen}>
                      Cancel
                    </CP.Button>
                    <CP.Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isInvalid}
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
                Canceling finding the account?
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

export default ForgotAccount;
