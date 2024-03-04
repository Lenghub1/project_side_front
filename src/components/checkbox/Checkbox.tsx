import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps
} from "@mui/material";
import CP from "..";

export interface CheckboxProps extends MuiCheckboxProps {
  label?: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <CP.Styled.CheckboxWrapper>
      <MuiCheckbox {...props} />
      {label && label}
    </CP.Styled.CheckboxWrapper>
  );
};

export default Checkbox;
