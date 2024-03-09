import React, { useState, useEffect } from "react";

type StateValue = string;
type Criteria = {
  length: { min: number; max: number };
  containsNumber: boolean;
  containsCapitalLetter: boolean;
  containsLowercaseLetter: boolean;
  containsSpecialCharacter: boolean;
};

type ValidatorFunction = (value: StateValue, criteria: Criteria) => string[];

export const useCriteriaValidator = (
  defaultValue: StateValue,
  criteria: Criteria,
  fieldName: string
) => {
  const [value, setValue] = useState<StateValue>(defaultValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<boolean>(false);

  const validate = (value: StateValue, criteria: Criteria): string[] => {
    const errors: string[] = [];

    if (
      value.length < criteria.length.min ||
      value.length > criteria.length.max
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
  }, [value, touched, criteria]);

  return { value, onChange, setValue, errors, onBlur, touched };
};
