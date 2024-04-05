import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import useValidatedInput from "@/hooks/useValidatedInput";
import CP from "@/components";
import { useEffect, useState } from "react";
import countries from "@/components/phonePrefix/countries.json";
import { SyntheticEvent } from "react";
import { authApi } from "@/api/auth";
import useApi from "@/hooks/useApi";
import { VERIFICATION_TYPE } from "../verifications/OTP";
import useCancelModal from "@/hooks/useCancelModal";
import useHistoryPopstate from "@/hooks/usePopState";
import { removeLeadingZeron } from "@/utils/commonUtil";
import { Flex } from "../getStarted/GetStarted";
import SignupMethod from "@/components/signupMethod/SignupMethod";
import SpaWithImage from "@/components/spaWithImage/SpaWithImage";
import { Title, FormContainer } from "../companySearch/CompanySearch";
import useMessageDisplay from "@/hooks/useMessageDisplay";
import { validateEmail, validatePhoneNumber } from "../signup/Signup";

type FindPasswordMethod = "email" | "phone";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const email = useValidatedInput("", "Email", validateEmail);
  const phone = useValidatedInput("", "Phone", validatePhoneNumber);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    dialCode: string;
    flag: string;
  }>(countries[0]);
  const [resetPasswordBy, setResetPasswordBy] =
    useState<FindPasswordMethod>("email");
  const { response, isSuccess, error, handleApiRequest } = useApi();
  const { open, handleCancelConfirm, handleModalOpen, handleCloseModal } =
    useCancelModal();
  const showMessage = useMessageDisplay();
  const location = useLocation();
  const isForgetPasswordRoute = location.pathname === "/forget-password";

  useHistoryPopstate(handleModalOpen);

  const isFormInvalid =
    resetPasswordBy === "phone"
      ? !phone.value || !!phone.error
      : !email.value || !!email.error;

  async function forgetPassword(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.forgotPassword(method, data));
  }

  useEffect(() => {
    if (error) {
      showMessage(
        `No results were found. Please check your ${
          resetPasswordBy === "phone" ? "phone number" : "email"
        } and try again.`,
        "error"
      );

      return;
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      if (resetPasswordBy === "phone") {
        showMessage(
          `OTP has been sent to ${selectedCountry.dialCode} ${phone.value}`,
          "success"
        );
        setTimeout(() => {
          navigate("/forget-password/verify-otp", {
            state: {
              type: VERIFICATION_TYPE.VERIFY_FORGET_PASSWORD,
              phone: `${selectedCountry.dialCode} ${phone.value}`,
              method: resetPasswordBy,
              data: {
                phoneNumber:
                  selectedCountry.dialCode + removeLeadingZeron(phone.value),
              },
            },
          });
        }, 1500);
      } else {
        showMessage(
          `Reset password verification link has been sent. Please check your email and verify`,
          "success"
        );
      }
    }
  }, [response, isSuccess]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      return;
    }

    let formData: any = {};

    if (resetPasswordBy === "email") {
      formData = { ...formData, email: email.value };
    } else if (resetPasswordBy === "phone") {
      // remove leading 0 from phone number (E.164 format)

      formData = {
        ...formData,
        phoneNumber: selectedCountry.dialCode + removeLeadingZeron(phone.value),
      };
    }

    await forgetPassword(resetPasswordBy, formData);
  };

  return (
    <>
      {isForgetPasswordRoute ? (
        <SpaWithImage>
          <CP.Styled.Form>
            <FormContainer>
              <CP.Styled.Div>
                <Title>Password Reset</Title>
                <CP.Typography padding={"0 0 1rem"}>
                  {`Enter your ${resetPasswordBy}  below and we\'ll send you password reset ${resetPasswordBy === "email" ? "token" : "OTP"}.`}
                </CP.Typography>
                <Flex direction="column" gap="24px" overflow="unset">
                  <SignupMethod
                    email={email}
                    phone={phone}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    signupMethod={resetPasswordBy}
                    setSignupMethod={setResetPasswordBy}
                  />

                  <CP.Styled.Div>
                    <Link to={"/forgot-account"}>Forget account?</Link>
                  </CP.Styled.Div>
                  <Flex width="100%" justify="flex-end" gap="20px">
                    <CP.Button variant="text" onClick={handleModalOpen}>
                      Cancel
                    </CP.Button>
                    <CP.Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isFormInvalid}
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
                Canceling reset password?
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

export default ForgetPassword;
