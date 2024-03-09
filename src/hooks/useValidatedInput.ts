// import React, { useState } from "react";

// export default (defaultValue, validate, fieldName) => {
//   const [value, setValue] = useState(defaultValue);
//   const [error, setError] = useState("");
//   const [touched, setTouched] = useState(false);

//   const onChange = (e) => {
//     const { value } = e.target;
//     setValue(value);
//     // no need to validate here if the field has not been touched yet
//   };

//   const onBlur = () => {
//     setTouched(true);
//     if (!value.trim()) {
//       setError(`${fieldName} is required`);
//     } else {
//       const errorMessage = validate(value);
//       setError(errorMessage);
//     }
//   };

//   // call validate function to update error state when value changes
//   React.useEffect(() => {
//     if (touched) {
//       const errorMessage = value.trim()
//         ? validate(value)
//         : `${fieldName} is required`;
//       setError(errorMessage);
//     }
//   }, [value, touched, validate, fieldName]);

//   return { value, onChange, setValue, error, onBlur };
// };

import { useState, useEffect, ChangeEvent } from "react";

type StateValue = string | number | boolean;

type ValidatorFunction = (value: StateValue) => string;

export default (
  defaultValue: StateValue,
  validate: ValidatorFunction,
  fieldName: string
) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // type guard to narrow down the type to HTMLInputElement
    const target = e.target as HTMLInputElement;

    let newValue: StateValue;
    switch (e.target.type) {
      case "checkbox":
        newValue = target.checked;
        break;

      case "number":
        newValue = Number(e.target.value);
        break;
      default:
        newValue = e.target.value;
    }

    setValue(newValue);
  };

  const onBlur = () => {
    setTouched(true);

    // set required message if the field is empty when blurred
    if (typeof value === "string" && !value.trim()) {
      setError(`${fieldName} is required`);
    } else {
      const errorMessage = validate(value);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (touched) {
      const errorMessage =
        typeof value === "string" && !value.trim()
          ? `${fieldName} is required`
          : validate(value);
      setError(errorMessage);
    }
  }, [value, touched, validate, fieldName]);

  return { value, onChange, setValue, error, onBlur };
};
