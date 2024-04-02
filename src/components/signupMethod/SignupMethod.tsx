// SignupMethodComponent.tsx
import React, { useState, SyntheticEvent } from "react";
import { Tab, Tabs } from "@mui/material";
import CP from "..";
import { Flex } from "@/pages/getStarted/GetStarted";
import { UseValidatedInputReturn } from "@/hooks/useValidatedInput";

interface SignupMethodComponentProps {
  email: UseValidatedInputReturn;
  phone: UseValidatedInputReturn;
  selectedCountry: { name: string; dialCode: string; flag: string };
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<{ name: string; dialCode: string; flag: string }>
  >;
  signupMethod: any;
  setSignupMethod: React.Dispatch<React.SetStateAction<any>>;
}

const SignupMethod = ({
  email,
  phone,
  selectedCountry,
  setSelectedCountry,
  signupMethod,
  setSignupMethod,
}: SignupMethodComponentProps) => {
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
    <>
      <Tabs
        sx={{ alignSelf: "flex-start" }}
        value={activeTabIndex}
        onChange={handleSignupMethodChange}
        aria-label="signup options"
      >
        <Tab label="With Email" />
        <Tab label="With Phone" />
      </Tabs>
      {activeTabIndex === 0 ? (
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
            InputProps={{
              inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: {
                  // Inline style for hiding spinners
                  WebkitAppearance: "none",
                  margin: "0",
                },
              },
            }}
            required
          />
        </Flex>
      )}
    </>
  );
};

export default SignupMethod;
