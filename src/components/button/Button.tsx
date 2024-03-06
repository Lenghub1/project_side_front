import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";

import CP from "..";
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
    <CP.Styled.ButtonWrapper>
      <MuiButton variant="contained" {...props}>
        {children}
      </MuiButton>
    </CP.Styled.ButtonWrapper>
  );
};

export default Button;
