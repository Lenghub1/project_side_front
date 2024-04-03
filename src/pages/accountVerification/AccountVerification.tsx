import CP from "@/components";
import { Flex } from "../getStarted/GetStarted";
import {
  CancelSignupButton,
  FormContainer,
  Title,
} from "../companySearch/CompanySearch";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "@/api/auth";
import useApi from "@/hooks/useApi";
import { useSnackbar } from "notistack";
import useCooldownTimer from "@/hooks/useCooldownTimer";

const AccountVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { isSuccess, isError, error, handleApiRequest, resetState } = useApi();
  const credential = location.state?.credential;
  const accountMethod = location.state?.accountMethod;
  const { isCooldown, cooldownTime, startCooldown } = useCooldownTimer(30);

  useEffect(() => {
    if (!accountMethod && !credential) {
      navigate(-1);
    }
  }, [credential, accountMethod]);

  const handleCodeResending = async (event: React.FormEvent) => {
    event.preventDefault();
    resetState();
    const data = accountMethod === "email" && { email: credential };

    startCooldown();

    await handleApiRequest(() =>
      authApi.resendActivationCode(accountMethod, data)
    );
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(`We have resent the verification code to your email`, {
        variant: "success",
      });
    } else if (isError) {
      enqueueSnackbar(error?.message, { variant: "error" });
      if (error?.statusCode === 409) {
        navigate("/login");
      }
    }
  }, [isSuccess, isError]);

  return (
    <CP.Styled.Form>
      <FormContainer>
        <CP.Styled.Div>
          <Title align="center">Account has not been verified!</Title>
          <Flex direction="column" gap="1.5rem" items="center">
            <CP.Typography align="center">
              Please ensure that you have checked your email for the
              verification code. If you have not received an email, you may
              click the resend button to receive a new code.
            </CP.Typography>

            <Flex gap="1rem" justify="center">
              <CancelSignupButton />
              <CP.Button
                disabled={isCooldown}
                type="submit"
                onClick={handleCodeResending}
              >
                {isCooldown ? `Resend (${cooldownTime})` : "Resend"}
              </CP.Button>
            </Flex>
          </Flex>
        </CP.Styled.Div>
      </FormContainer>
    </CP.Styled.Form>
  );
};

export default AccountVerification;
