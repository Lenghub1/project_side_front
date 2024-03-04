import CP from "@/components";
import {
  TextField as MuiInput,
  TextFieldProps as MuiInputProps
} from "@mui/material";

// export interface InputProps extends MuiInputProps {}

const Input = ({ ...props }: MuiInputProps) => {
  return (
    <CP.Styled.InputWrapper>
      <MuiInput {...props} />
    </CP.Styled.InputWrapper>
  );
};

export default Input;
