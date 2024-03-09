import React, { useState } from "react";

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
