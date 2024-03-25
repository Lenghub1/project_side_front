import MuiContainer, {
  ContainerProps as MuiCatainerProps,
} from "@mui/material/Container";
import { ReactNode } from "react";

export interface ContainerProps extends MuiCatainerProps {
  children: ReactNode;
  maxwidth?: string;
  isfixed?: boolean;
}

const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <MuiContainer
      sx={{
        color: (theme) => {
          return theme.palette.text.primary;
        },
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
