import CP from "@/components";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useState, useEffect, ChangeEvent } from "react";

type ValidatorFunction = (value: string) => string;
type DummyValidatorFunction = () => string;

/**
 * A custom hook for managing and validating the state of a form input.
 *
 * This hook extends the basic input handling by incorporating validation logic.
 * It tracks the input value, validation errors, and whether the input has been
 * interacted with (touched).
 *
 * @param {string} defaultValue - The initial value of the input field.
 * @param {ValidatorFunction} validate - A function that takes the input value and returns an error message if validation fails.
 * @param {string} fieldName - The name of the field, used for generating error messages.
 * @returns An object containing the input value, onChange and onBlur handlers, a setter function for the value, the current error message, and a helper text component for displaying the error.
 */

export default function useValidatedInput(
  defaultValue: string,
  fieldName: string,
  validate: ValidatorFunction | DummyValidatorFunction = () => ""
) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!touched) {
      setTouched(true);
    }
  };

  const onBlur = () => {
    setTouched(true);
    if (!value.trim()) {
      setError(`${fieldName} is required`);
    } else {
      const errorMessage = validate(value);
      setError(errorMessage);
    }
  };

  // call validate function to update error state when value changes
  useEffect(() => {
    if (touched) {
      const errorMessage = value.trim()
        ? validate(value)
        : `${fieldName} is required`;
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [value, touched]);

  const HelperText = (): ReactJSXElement | null => {
    return error ? (
      <CP.Typography
        variant={"inherit"}
        color={"inherit"}
        component={"span"}
      >{`✖ ${error}`}</CP.Typography>
    ) : null;
  };

  return {
    value,
    onChange,
    setValue,
    error,
    setError,
    onBlur,
    HelperText,
    touched,
    setTouched,
  };
}
