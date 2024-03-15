import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { authApi } from "@/api/auth";
import useValidatedInput from "@/hooks/useValidatedInput";
import useCriteriaValidator from "@/hooks/useCriteriaInput.tsx";
import { SyntheticEvent, useEffect, useState } from "react";
import useMatchInput from "@/hooks/useMatchInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import countries from "@/components/phonePrefix/countries.json";
import { useSnackbar } from "notistack";
import useApi from "@/hooks/useApi";
import { Flex } from "../getStarted/GetStarted";
import { Title, FormContainer } from "../companySearch/CompanySearch";

const Divider = styled(MuiDivider)`
  width: 100%;
`;

type SignupProps = {
  accountType: "employee" | "employer";
};

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

const SignupPage = ({ accountType = "employer" }: SignupProps) => {
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
  const activeTabIndex = signupMethod === "email" ? 0 : 1;

  const handleSignupMethodChange = (
    event: SyntheticEvent,
    newValue: number
  ) => {
    const method = newValue === 0 ? "email" : "phone";
    if (method === "phone" && email.touched) {
      email.setTouched(false);
      if (email.value) email.setValue("");
    } else if (method === "email" && phone.touched) {
      phone.setTouched(false);
      if (phone.value) phone.setValue("");
    }
    setSignupMethod(method);
  };

  const isFormInvalid =
    !firstName.value ||
    !!firstName.error ||
    !lastName.value ||
    !!lastName.error ||
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
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }

  const { isLoading, error, handleApiRequest } = useApi();

  async function signup(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.signup(method, data));
  }

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
          <Tabs
            sx={{ alignSelf: "flex-start" }}
            value={activeTabIndex}
            onChange={(e, value) => handleSignupMethodChange(e, value)}
            aria-label="signup options"
          >
            <Tab label="With Email" />
            <Tab label="With Phone" />
          </Tabs>
          {signupMethod === "email" ? (
            <CP.Input
              label="Email"
              value={email.value}
              onChange={email.onChange}
              placeholder="Email"
              type="email"
              onBlur={email.onBlur}
              error={!!email.error}
              helperText={<email.HelperText />}
              required
            />
          ) : (
            <Flex gap="0.5rem" items="flex-start">
              <CP.PhonePrefix
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
              <CP.Input
                label="Phone number"
                value={phone.value}
                type="number"
                onChange={phone.onChange}
                placeholder="Phone"
                onBlur={phone.onBlur}
                error={!!phone.error}
                helperText={<phone.HelperText />}
                required
              />
            </Flex>
          )}

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
