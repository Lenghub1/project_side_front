import { useEffect, useRef, FC } from "react";
import { MuiOtpInput, MuiOtpInputProps } from "mui-one-time-password-input";

interface MuiInputFocusProps extends MuiOtpInputProps {
  setError: (error: boolean) => void;
}

const OtpInputComponent: FC<MuiInputFocusProps> = ({ setError, ...props }) => {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inputCurrent = inputRef.current;

    if (inputCurrent) {
      const inputs = inputCurrent.querySelectorAll("input");
      const handleFocus = () => setError(false);

      inputs.forEach((input) => {
        input.addEventListener("focus", handleFocus);
      });
    }
  }, [setError]);

  return <MuiOtpInput ref={inputRef} {...props} />;
};

export default OtpInputComponent;
