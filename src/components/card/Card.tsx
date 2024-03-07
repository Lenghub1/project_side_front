import CP from "@/components";
import Paper, { PaperProps } from "@mui/material/Paper";
import { ReactNode } from "react";

export interface CardProps extends PaperProps {
  children?: string | ReactNode;
  height?: string;
  width?: string;
  padding?: string;
}

const Card = ({
  children,
  height,
  width,
  padding = "1rem",
  sx,
  ...props
}: CardProps) => {
  return (
    <CP.Styled.CardWrapper width={width}>
      <Paper
        sx={{
          padding,
          height,
          minWidth: "48px",
          ...sx,
        }}
        {...props}
      >
        {children}
      </Paper>
    </CP.Styled.CardWrapper>
  );
};

export default Card;
