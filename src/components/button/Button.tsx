import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";

import { ColorPalette } from "@/@type/common";

/**
 * * Ignore the interface warning below as we extended another color palette
 */
export interface ButtonProps extends MuiButtonProps {
  children: ReactNode;
  color?: ColorPalette;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <MuiButton variant="contained" {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
