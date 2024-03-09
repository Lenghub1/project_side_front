import React, { useState } from "react";

/**
 * A custom hook for managing the state of a form input.
 *
 * This hook abstracts the common pattern of initializing a state,
 * updating it based on user input, and providing a method to manually
 * set the state. It supports input types of string, number, and boolean.
 *
 * @param {string | number | boolean} defaultValue - The initial value of the input.
 * @returns An object containing the current value, a change handler, and a setter function.
 */
export default (defaultValue: string | number | boolean) => {
  const [value, setValue] = useState<string | number | boolean>(defaultValue);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onChange, setValue };
};
