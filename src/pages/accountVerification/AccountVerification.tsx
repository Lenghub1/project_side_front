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

const AccountVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { isSuccess, isError, error, handleApiRequest, resetState } = useApi();
  const credential = location.state?.credential;
  const accountMethod = location.state?.accountMethod;
  const [isCooldown, setIsCooldown] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);

  useEffect(() => {
    if (!accountMethod && !credential) {
      navigate(-1);
    }
  }, [credential, accountMethod]);

  useEffect(() => {
    // clear timeout on component unmount
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleCodeResending = async (event: React.FormEvent) => {
    event.preventDefault();
    resetState();
    const data = accountMethod === "email" && { email: credential };

    setIsCooldown(true);
    // set cooldown time (e.g., 30 seconds)
    const id = setTimeout(() => setIsCooldown(false), 30000);
    setTimeoutId(id);

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
