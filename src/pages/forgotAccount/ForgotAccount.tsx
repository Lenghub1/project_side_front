import { useNavigate, useLocation, Link } from "react-router-dom";
import useValidatedInput from "@/hooks/useValidatedInput";
import useInput from "@/hooks/useInput";
import CP from "@/components";
import { SyntheticEvent, useEffect } from "react";
import { authApi } from "@/api/auth";
import { Outlet } from "react-router-dom";
import useCancelModal from "@/hooks/useCancelModal";
import SpaWithImage from "@/components/spaWithImage/SpaWithImage";
import { Title, FormContainer } from "../companySearch/CompanySearch";
import useApi from "@/hooks/useApi";
import { forgotAccountInformation } from "@/store/userStore";
import { useSetRecoilState } from "recoil";
import Loading from "@/components/loading/Loading";
import useMessageDisplay from "@/hooks/useMessageDisplay";
import { validateName } from "../signup/Signup";
import { Flex } from "../getStarted/GetStarted";

const ForgotAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const firstName = useValidatedInput("", "First name", validateName);
  const lastName = useValidatedInput("", "Last name", validateName);
  const companyCode = useInput("");
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const isForgotAccountRoute = location.pathname === "/forgot-account";
  const { isError, isLoading, response, error, isSuccess, handleApiRequest } =
    useApi();
  const setInformation = useSetRecoilState(forgotAccountInformation);
  const showMessage = useMessageDisplay();

  useEffect(() => {
    if (isError) {
      showMessage("Not results exist. Please try again!", "error");
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess && response) {
      setInformation(response.data);
      showMessage(
        `${response.data.length} result${response.data.length > 1 ? "s were" : " was"}  found`,
        "success"
      );
      if (response.data.length > 1) {
        setTimeout(() => {
          navigate("/forgot-account/informations");
        }, 1500);
      }
      setTimeout(() => {
        navigate("/forgot-account/informations/0");
      }, 1500);
    }
  }, [response, isSuccess]);

  async function forgotAccount(data: any): Promise<void> {
    await handleApiRequest(() => authApi.findForgotAccount(data));
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    let data = {
      firstName: firstName.value,
      lastName: lastName.value,
      orgId: companyCode.value,
    };
    await forgotAccount(data);
  };

  const isInvalid =
    (!firstName.value && !!firstName.setError) ||
    (!lastName.value && !!lastName.setError) ||
    !companyCode.value;
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
                    label="First name"
                    value={firstName.value}
                    onChange={firstName.onChange}
                    onBlur={firstName.onBlur}
                    error={!!firstName.error}
                    helperText={<firstName.HelperText />}
                    required
                  />
                  <CP.Input
                    label="Last name"
                    value={lastName.value}
                    onChange={lastName.onChange}
                    onBlur={lastName.onBlur}
                    error={!!lastName.error}
                    helperText={<firstName.HelperText />}
                    required
                  />
                  <CP.Input
                    label="Company code"
                    value={companyCode.value}
                    onChange={companyCode.onChange}
                    inputProps={{ maxLength: 6 }}
                    required
                  />

                  <CP.Styled.Div width="100%">
                    <CP.Typography
                      color="textSecondary"
                      fontSize="0.875rem"
                      textAlign="start"
                    >
                      If you don't know your company code, please contact your
                      employer or HR department.
                    </CP.Typography>
                  </CP.Styled.Div>

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
