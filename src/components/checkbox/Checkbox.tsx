import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps
} from "@mui/material";
import CP from "..";
import { ColorPalette } from "@/@type/common";

/**
 * * Ignore the interface warning below as we extended another color palette
 */
export interface CheckboxProps extends MuiCheckboxProps {
  label?: string;
  color?: ColorPalette;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <CP.Styled.CheckboxWrapper>
      {label && <CP.Typography color="text.secondary">{label}</CP.Typography>}
      <MuiCheckbox {...props} />
    </CP.Styled.CheckboxWrapper>
  );
};

export default Checkbox;
