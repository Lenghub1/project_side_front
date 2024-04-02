import { useNavigate, useLocation, Link } from "react-router-dom";
import useValidatedInput from "@/hooks/useValidatedInput";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import styled from "styled-components";
import { SyntheticEvent, useEffect } from "react";
import { useSnackbar } from "notistack";
import { authApi } from "@/api/auth";
import { Outlet } from "react-router-dom";
import useCancelModal from "@/hooks/useCancelModal";
import SpaWithImage from "@/components/spaWithImage/SpaWithImage";
import { Title, FormContainer } from "../companySearch/CompanySearch";
import useApi from "@/hooks/useApi";
import { forgotAccountInformation } from "@/store/userStore";
import { useSetRecoilState } from "recoil";
import Loading from "@/components/loading/Loading";
const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const ForgotAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const username = useValidatedInput("", "Username");
  const companyCode = useInput("");
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const isForgotAccountRoute = location.pathname === "/forgot-account";
  const { isError, isLoading, response, error, isSuccess, handleApiRequest } =
    useApi();
  const setInformation = useSetRecoilState(forgotAccountInformation);
  const isFormIvalid =
    !username.value ||
    !!username.error ||
    function showError(message: string) {
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom", // or 'bottom'
          horizontal: "left", // or 'left', 'center'
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
  useEffect(() => {
    if (isError) {
      showMessage("Not results exist. Please try again!", "error");
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess && response) {
      setInformation(response.data);

      navigate("/forgot-account/informations");
    }
  }, [response, isSuccess]);

  async function forgotAccount(data: any): Promise<void> {
    await handleApiRequest(() => authApi.findForgotAccount(data));
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
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  return (
    <>
      {isForgotAccountRoute ? (
        <SpaWithImage>
          <CP.Styled.Form>
            <FormContainer>
              <CP.Styled.Div>
                <Title>Forgot Account</Title>
                <CP.Typography padding={"0 0 1rem"}>
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

                  <CP.Styled.Div>
                    <Link to={"/forget-password"}>Forget password?</Link>
                  </CP.Styled.Div>

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
              </CP.Styled.Div>
            </FormContainer>
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
                Canceling finding the account?
              </CP.Typography>
              <CP.Typography> Are you sure to cancel it now?</CP.Typography>
            </CP.Styled.Flex>
          </CP.Modal>
        </SpaWithImage>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ForgotAccount;
