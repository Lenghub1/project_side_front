import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { signupApi } from "@/api/auth";
import useValidatedInput from "@/hooks/useValidatedInput";
import useCriteriaValidator from "@/hooks/useCriteriaInput.tsx";
import { SyntheticEvent, useState } from "react";
import useMatchInput from "@/hooks/useMatchInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import countries from "@/components/phonePrefix/countries.json";

export const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const Divider = styled(MuiDivider)`
  width: 100%;
`;

type SignupProps = {
  accountType: "employee" | "employer";
};

type SignupMethod = "email" | "phone";

const validateEmail = (email: string): string => {
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

const SignupPage = ({ accountType = "employer" }: SignupProps) => {
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

  const activeTabIndex = signupMethod === "email" ? 0 : 1;

  return (
    <CP.Styled.Wrapper height="100vh">
      <Flex height="100%">
        <CP.Styled.Div padding="0 1rem">
          <CP.Styled.Form>
            <Flex items="flex-start" padding="0 3rem" direction="column">
              <CP.Typography
                variant="h4"
                style={{
                  marginBottom: "2rem",
                  fontWeight: "semibold",
                  textAlign: "start",
                }}
              >
                Create a new account
              </CP.Typography>

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
                    endAdornment: (
                      <IconButton
                        onClick={() => setPasswordIsVisible((prev) => !prev)}
                      >
                        {passwordIsVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />

                <CP.Input
                  label="Confirm password"
                  type="password"
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
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                <Divider></Divider>
                <Flex gap="1rem">
                  <CP.Button variant="text">Cancel</CP.Button>
                  <CP.Button type="submit" onClick={signup}>
                    Signup
                  </CP.Button>
                </Flex>
                <CP.Typography variant="subtitle2">
                  By signing up, you agree to our{" "}
                  <NavLink to="#">Terms of Service</NavLink> &{" "}
                  <NavLink to="#">Privacy Policy</NavLink>
                </CP.Typography>
              </Flex>
            </Flex>
            <Flex direction="column" margin="1rem 0 0" gap="1rem">
              <Divider></Divider>
              <CP.Typography>
                Already have an account? <NavLink to="#">Login here</NavLink>
              </CP.Typography>
            </Flex>
          </CP.Styled.Form>
        </CP.Styled.Div>
        <CP.Styled.Div height="100%">
          <Flex>
            <CP.Typography variant="subtitle1">Image</CP.Typography>
          </Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default SignupPage;

async function signup(): Promise<void> {
  try {
    const randomData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "SecurePassword123",
    };
    signupApi.signup(randomData);
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
}
