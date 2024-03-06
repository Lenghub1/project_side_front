import MuiTypography, {
  TypographyProps as MuiTypographyProps
} from "@mui/material/Typography";
import { ReactNode } from "react";

export interface TypographyProps extends MuiTypographyProps {
  children?: ReactNode;
}

const Typography = ({ children, ...props }: TypographyProps) => {
  return (
    <MuiTypography color="text.primary" {...props}>
      {children}
    </MuiTypography>
  );
};

export default Typography;
