import CP from "@/components";
import {
  TextField as MuiInput,
  TextFieldProps as MuiInputProps,
} from "@mui/material";

// export interface InputProps extends MuiInputProps {}

const InputBox = ({ ...props }: MuiInputProps) => {
  return (
    <CP.Styled.InputBoxWrapper>
      <MuiInput color="info" {...props} />
    </CP.Styled.InputBoxWrapper>
  );
};

export default InputBox;
