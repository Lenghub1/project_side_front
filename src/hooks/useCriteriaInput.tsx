import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import CP from "@/components";

type StateValue = string;
type Criteria = {
  length?: { min: number; max: number };
  containsNumber?: boolean;
  containsCapitalLetter?: boolean;
  containsLowercaseLetter?: boolean;
  containsSpecialCharacter?: boolean;
};

/**
 * A custom React hook for validating an input value against a set of criteria.
 *
 * This hook is designed to validate input fields. It supports validation for minimum and maximum
 * length, presence of numbers, capital letters, lowercase letters, and special characters..
 *
 * @param {StateValue} defaultValue - The initial value of the input field.
 * @param {Criteria} criteria - An object specifying the validation criteria.
 * @returns An object containing the input value, a list of validation errors, onChange and onBlur handlers, and a HelperText component for displaying errors.
 */
export default function useCriteriaValidator(
  defaultValue: StateValue,
  criteria: Criteria
) {
  const theme = useTheme();
  const [value, setValue] = useState<StateValue>(defaultValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<boolean>(false);

  const validate = (value: StateValue, criteria: Criteria): string[] => {
    const errors: string[] = [];

    if (
      criteria.length &&
      (value.length < criteria.length.min || value.length > criteria.length.max)
    ) {
      errors.push(
        `From ${criteria.length.min} to ${criteria.length.max} characters`
      );
    }
    if (criteria.containsNumber && !/\d/.test(value)) {
      errors.push("At least one number");
    }
    if (criteria.containsCapitalLetter && !/[A-Z]/.test(value)) {
      errors.push("At least one capital letter");
    }
    if (criteria.containsLowercaseLetter && !/[a-z]/.test(value)) {
      errors.push("At least one lowercase letter");
    }
    if (
      criteria.containsSpecialCharacter &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(value)
    ) {
      errors.push(
        "At least one special character such as exclamation point or comma"
      );
    }

    return errors;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!touched) {
      setTouched(true);
    }
  };

  const onBlur = () => {
    setTouched(true);
    const validationErrors = validate(value, criteria);
    setErrors(validationErrors);
  };

  useEffect(() => {
    if (touched) {
      const validationErrors = validate(value, criteria);
      setErrors(validationErrors);
    }
  }, [value, touched]);

  const criteriaList = [
    { check: criteria.length, message: "From 8 to 25 characters" },
    { check: criteria.containsNumber, message: "At least one number" },
    {
      check: criteria.containsCapitalLetter,
      message: "At least one capital letter",
    },
    {
      check: criteria.containsLowercaseLetter,
      message: "At least one lowercase letter",
    },
    {
      check: criteria.containsSpecialCharacter,
      message:
        "At least one special character such as exclamation point or comma",
    },
  ];

  const HelperText = (): ReactJSXElement | null => {
    return touched && errors.length !== 0 ? (
      <>
        {criteriaList.map(
          (criterion, index) =>
            criterion.check && (
              <CP.Typography
                variant={"inherit"}
                component="span" // cannot use other element as children
                key={index}
                style={{
                  display: "block",
                  color: errors.includes(criterion.message)
                    ? theme.palette.error.main
                    : theme.palette.success.main,
                }}
              >
                {errors.includes(criterion.message) ? "✖" : "✔"}{" "}
                {criterion.message}
              </CP.Typography>
            )
        )}
      </>
    ) : null;
  };

  return { value, onChange, setValue, errors, onBlur, HelperText };
}
