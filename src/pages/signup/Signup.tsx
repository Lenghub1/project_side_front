import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { signupApi } from "@/api/auth";
import useValidatedInput from "@/hooks/useValidatedInput";
import { useCriteriaValidator } from "@/hooks/useCriteriaInput";

export const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const Divider = styled(MuiDivider)`
  width: 100%;
`;

interface SignupProps {
  accountType: "employee" | "employer";
}

const validateEmail = (email: string): string => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

const SignupPage = ({ accountType = "employer" }: SignupProps) => {
  const email = useValidatedInput("", validateEmail, "Email");
  const criteria = {
    length: { min: 8, max: 25 },
    containsNumber: true,
    containsCapitalLetter: true,
    containsLowercaseLetter: true,
    containsSpecialCharacter: true,
  };

  const hasError = (errorType) => password.errors.includes(errorType);

  const password = useCriteriaValidator("", criteria, "Password");
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
              <Flex direction="column" gap="24px">
                <CP.Input
                  label="Email or Phone number"
                  value={email.value}
                  onChange={email.onChange}
                  placeholder="Email"
                  onBlur={email.onBlur}
                  error={!!email.error}
                  helperText={email.error}
                  required
                />

                <CP.Input
                  label="Password"
                  type="password"
                  value={password.value}
                  onChange={password.onChange}
                  onBlur={password.onBlur}
                  error={password.errors.length > 0}
                  helperText={
                    password.touched && (
                      <ul>
                        <li
                          style={{
                            color: hasError("From 8 to 25 characters")
                              ? "red"
                              : "green",
                          }}
                        >
                          {hasError("From 8 to 25 characters") ? "✖" : "✔"}{" "}
                          From 8 to 25 characters
                        </li>
                        <li
                          style={{
                            color: hasError("At least one number")
                              ? "red"
                              : "green",
                          }}
                        >
                          {hasError("At least one number") ? "✖" : "✔"} At
                          least one number
                        </li>
                        <li
                          style={{
                            color: hasError("At least one capital letter")
                              ? "red"
                              : "green",
                          }}
                        >
                          {hasError("At least one capital letter")
                            ? "✖"
                            : "✔"}{" "}
                          At least one capital letter
                        </li>
                        <li
                          style={{
                            color: hasError("At least one lowercase letter")
                              ? "red"
                              : "green",
                          }}
                        >
                          {hasError("At least one lowercase letter")
                            ? "✖"
                            : "✔"}{" "}
                          At least one lowercase letter
                        </li>
                        <li
                          style={{
                            color: hasError(
                              "At least one special character such as exclamation point or comma"
                            )
                              ? "red"
                              : "green",
                          }}
                        >
                          {hasError(
                            "At least one special character such as exclamation point or comma"
                          )
                            ? "✖"
                            : "✔"}{" "}
                          At least one special character such as exclamation
                          point or comma
                        </li>
                      </ul>
                    )
                  }
                  required
                />
                {/* <div className="errors">
                  {password.errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div> */}

                {accountType === "employer" && (
                  <>
                    <CP.Input label="First name" required />
                    <CP.Input label="Last name" required />
                  </>
                )}

                <CP.Input label="Confirm password" type="password" required />

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
