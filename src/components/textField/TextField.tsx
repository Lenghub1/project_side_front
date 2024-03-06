import MuiTextField, {
  TextFieldProps as MuiTextFieldProps
} from "@mui/material/TextField";

type TextFieldProps = MuiTextFieldProps<"filled" | "standard" | "outlined">;

const TextField = ({ ...props }: TextFieldProps) => {
  return <MuiTextField color="info" {...props} />;
};

export default TextField;
