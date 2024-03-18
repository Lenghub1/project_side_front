import CP from "@/components";
import { useLocation } from "react-router-dom";
import { authApi } from "@/api/auth";
import useValidatedInput from "@/hooks/useValidatedInput";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import useApi from "@/hooks/useApi";
import { Flex } from "../getStarted/GetStarted";
import { Title, FormContainer } from "../companySearch/CompanySearch";
import RoleInput from "./RoleInput";

const InformationInput = () => {
  const location = useLocation();
  //   const isJoinCompany = location.pathname === "/get-started/join-company";
  const { enqueueSnackbar } = useSnackbar();
  const firstName = useValidatedInput("", "First Name");
  const lastName = useValidatedInput("", "Last Name");

  function showError(message: string) {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }

  const { isLoading, isSuccess, error, handleApiRequest } = useApi();

  async function signup(method: string, data: any): Promise<void> {
    await handleApiRequest(() => authApi.signup(method, data));
  }

  function resetState() {
    firstName.reset();
    lastName.reset();
  }

  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
  }, [error]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <FormContainer>
        <CP.Styled.Div>
          <Title>Personal Information</Title>

          <Flex direction="column" gap="1.5rem">
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
            <RoleInput />

            <Flex>
              <CP.Button variant="text">Cancel</CP.Button>
              <CP.Button
                //   disabled={isFormInvalid}
                type="submit"
                onClick={handleSubmit}
              >
                Signup
              </CP.Button>
            </Flex>
          </Flex>
        </CP.Styled.Div>
      </FormContainer>
    </>
  );
};

export default InformationInput;
