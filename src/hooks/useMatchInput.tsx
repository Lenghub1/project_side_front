import CP from "@/components";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useState, useEffect } from "react";

/**
 * A custom hook to check if two values match (e.g., password and confirm password).
 *
 * @param {string} originalValue The original value to match against.
 * @param {string} confirmValue The value to confirm matches the original.
 * @param {string} fieldName The name of the field to display in error messages.
 * @returns An object containing the confirm value, an error message if the values do not match, and handlers for changes and blur events.
 */
export default function useMatchInput(
  originalValue: string,
  confirmValue: string,
  fieldName: string
) {
  const [value, setValue] = useState(confirmValue);
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!touched) {
      setTouched(true);
    }
  };

  const onBlur = () => {
    setTouched(true);
    checkMatch();
  };

  // Function to check if the original value and confirm value match
  const checkMatch = () => {
    if (value !== originalValue) {
      setError(`${fieldName} does not match`);
    } else {
      setError("");
    }
  };

  // Use useEffect to update the error state when either value changes
  useEffect(() => {
    if (touched) {
      checkMatch();
    }
  }, [value, originalValue, touched]);

  const HelperText = (): ReactJSXElement | null => {
    return error ? (
      <CP.Typography
        variant={"inherit"}
        color={"inherit"}
        component={"span"}
      >{`✖ ${error}`}</CP.Typography>
    ) : null;
  };

  return { value, onChange, setValue, onBlur, error, setError, HelperText };
}
