import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import useValidatedInput from "@/hooks/useValidatedInput";
import useCriteriaValidator from "@/hooks/useCriteriaInput.tsx";
import { SyntheticEvent, useEffect, useState } from "react";
import useMatchInput from "@/hooks/useMatchInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import countries from "@/components/phonePrefix/countries.json";
import { useSnackbar } from "notistack";
import useApi from "@/hooks/useApi";
import { Flex } from "../getStarted/GetStarted";
import { Title, FormContainer } from "../companySearch/CompanySearch";
import SignupMethod from "@/components/signupMethod/SignupMethod";

const Divider = styled(MuiDivider)`
  width: 100%;
`;

type AccountType = "employee" | "employer";

type SignupMethod = "email" | "phone";

export const validateEmail = (email: string): string => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

const passwordCriteria = {
  length: { min: 8, max: 25 },
  containsNumber: true,
  containsCapitalLetter: true,
  containsLowercaseLetter: true,
  // containsSpecialCharacter: true,
};

interface LoginResponse {
  user: {
    accessToken: string;
  };
}

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isJoinCompany = location.pathname === "/get-started/join-company";
  const accountType: AccountType = isJoinCompany ? "employee" : "employer";
  const { enqueueSnackbar } = useSnackbar();
  const firstName = useValidatedInput("", "First Name");
  const lastName = useValidatedInput("", "Last Name");
  const [signupMethod, setSignupMethod] = useState<SignupMethod>("email");
  const email = useValidatedInput("", "Email", validateEmail);

  const phone = useValidatedInput("", "Phone");
  const password = useCriteriaValidator("", passwordCriteria);
  const confirmPassword = useMatchInput(password.value, "", "Confirm Password");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    dialCode: string;
    flag: string;
  }>(countries[0]);

  const isFormInvalid =
    ((!firstName.value || !!firstName.error) && accountType === "employer") ||
    !lastName.value ||
    (!!lastName.error && accountType === "employer") ||
    (signupMethod === "phone"
      ? !phone.value || !!phone.error
      : !email.value || !!email.error) ||
    !password.value ||
    password.errors.length !== 0 ||
    !confirmPassword.value ||
    !!confirmPassword.error;

  function showError(message: string) {
    enqueueSnackbar(message, {
      variant: "error",
    });
  }

  const { isLoading, isSuccess, error, handleApiRequest } = useApi();

  async function signup(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.signup(method, data));
  }

  function resetState() {
    firstName.reset();
    lastName.reset();
    email.reset();
    phone.reset();
    password.reset();
    confirmPassword.reset();
  }

  useEffect(() => {
    if (isSuccess && signupMethod === "email") {
      resetState();
    }
  }, [isSuccess, signupMethod]);

  useEffect(() => {
    if (isSuccess && signupMethod === "email") {
      // enqueueSnackbar("We've sent a verification code to your email.", {
      //   variant: "success",
      // });
      navigate("/login/activate-account", {
        state: { credential: email.value, accountMethod: signupMethod },
      });
    }
  }, [isSuccess, signupMethod]);

  useEffect(() => {
    if (error) {
      console.log(error.message);
      if (error.statusCode === 409) {
        if (signupMethod === "email") {
          showError(
            "Email already exists. Please use a different email or log in."
          );
          email.setError("Email already exists.");
        } else {
          showError(
            "Phone number already exists. Please use a different number or log in."
          );
          phone.setError("Phone number already exists.");
        }
      } else {
        showError("Something went wrong. Please try again.");
      }
    }
  }, [error]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      console.log("Form is invalid");
      return;
    }

    let formData: any = {
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      accountType,
    };

    if (signupMethod === "email") {
      formData = { ...formData, email: email.value };
    } else if (signupMethod === "phone") {
      // remove leading 0 from phone number (E.164 format)
      const phoneWithoutLeadingZero = phone.value.replace(/^0+/, "");

      formData = {
        ...formData,
        phoneNumber: selectedCountry.dialCode + phoneWithoutLeadingZero,
      };
    }

    await signup(signupMethod, formData);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <CP.Styled.Form>
      <FormContainer>
        <CP.Styled.Div>
          <Title>Create a new account</Title>
          <Flex direction="column" gap="1.5rem">
            {accountType === "employer" && (
              <Flex gap=".5rem" items="flex-start">
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
                  helperText={<lastName.HelperText />}
                  required
                />
              </Flex>
            )}
            <SignupMethod
              email={email}
              phone={phone}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              signupMethod={signupMethod}
              setSignupMethod={setSignupMethod}
            />

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
                autoComplete: "new-password",
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
                    onClick={() => setConfirmPasswordIsVisible((prev) => !prev)}
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

            <Divider></Divider>
            <Flex gap="1rem">
              <CP.Button variant="text">Cancel</CP.Button>
              <CP.Button
                disabled={isFormInvalid}
                type="submit"
                onClick={handleSubmit}
              >
                Signup
              </CP.Button>
            </Flex>
            <CP.Typography variant="subtitle2">
              By signing up, you agree to our{" "}
              <NavLink to="#">Terms of Service</NavLink> &{" "}
              <NavLink to="#">Privacy Policy</NavLink>
            </CP.Typography>
          </Flex>
        </CP.Styled.Div>
      </FormContainer>
      <Flex direction="column" margin="1rem 0 0" gap="1rem">
        <Divider></Divider>
        <CP.Typography>
          Already have an account? <NavLink to="#">Login here</NavLink>
        </CP.Typography>
      </Flex>
    </CP.Styled.Form>
  );
};

export default SignupPage;
