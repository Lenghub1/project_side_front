import CP from "@/components";
import {
  ButtonProps as ButtonCompProps,
  Button as MuiButton
} from "@mui/material";

export interface ButtonProps extends ButtonCompProps {
  children?: string;
}

const Button = ({ children, variant = "contained", ...props }: ButtonProps) => {
  return (
    <CP.Styled.ButtonWrapper>
      <MuiButton variant={variant} {...props}>
        {children}
      </MuiButton>
    </CP.Styled.ButtonWrapper>
  );
};

export default Button;
