// MuiOtpInputStyled.tsx
import styled from "styled-components";
import OtpInputComponent from "./OTPInput";
import { MuiOtpInputProps } from "mui-one-time-password-input";

interface MuiOtpInputStyledProps extends MuiOtpInputProps {
  inputWidth?: string;
  inputHeight?: string;
  fontSize?: string;
}

const OtpInputStyled = styled(OtpInputComponent)<MuiOtpInputStyledProps>`
  width: auto;
  margin-inline: auto;
  .MuiOtpInput-TextField {
    width: ${({ inputWidth }) => inputWidth || "40px"} !important;
    height: ${({ inputHeight }) => inputHeight || "40px"} !important;
    & .MuiInputBase-root {
      height: ${({ inputHeight }) => inputHeight || "40px"} !important;
      font-size: ${({ fontSize }) => fontSize || "1.2rem"} !important;
    }
  }
`;

export default OtpInputStyled;
