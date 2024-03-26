import CP from "@/components";
import { Flex } from "../getStarted/GetStarted";
import { FormContainer, Title } from "../companySearch/CompanySearch";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authApi } from "@/api/auth";
import useApi from "@/hooks/useApi";
import { useSnackbar } from "notistack";

const AccountVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { isSuccess, isError, error, handleApiRequest, resetState } = useApi();
  const credential = location.state?.credential;
  const accountMethod = location.state?.accountMethod;

  useEffect(() => {
    if (!accountMethod && !credential) {
      navigate(-1);
      console.log("No credential");
    }
  }, [credential, accountMethod]);
  const handleCodeResending = async (event: React.FormEvent) => {
    event.preventDefault();
    resetState();
    const data =
      accountMethod === "email"
        ? { email: credential }
        : { phoneNumber: credential };

    console.log(data);
    await handleApiRequest(() =>
      authApi.resendActivationCode(accountMethod, data)
    );
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("We have resend the code to your ", {
        variant: "success",
      });
    } else if (isError) {
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  }, [isSuccess, isError]);

  return (
    <CP.Styled.Form>
      <FormContainer>
        <CP.Styled.Div>
          <Title align="center">Account has not been verified</Title>
          <Flex direction="column" gap="1.5rem" items="center">
            <CP.Typography>
              You must verify your{" "}
              {accountMethod === "email" ? "email" : "phone nubmer"} "
              {credential}" first. <br />
              If you haven't received{" "}
              {accountMethod === "email" ? "an email" : "a sms"}, please click
              resend button.
            </CP.Typography>

            <Flex gap="1rem" justify="center">
              <CP.Button variant="text">Cancel</CP.Button>
              <CP.Button type="submit" onClick={handleCodeResending}>
                Resend
              </CP.Button>
            </Flex>
          </Flex>
        </CP.Styled.Div>
      </FormContainer>
    </CP.Styled.Form>
  );
};

export default AccountVerification;
