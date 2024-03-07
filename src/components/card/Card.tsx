import CP from "@/components";
import Paper, { PaperProps } from "@mui/material/Paper";
import { ReactNode } from "react";

export interface CardProps extends PaperProps {
  children?: string | ReactNode;
  height?: string;
  width?: string;
}

const Card = ({
  children,
  height,
  width = "fit-content",
  sx,
  ...props
}: CardProps) => {
  return (
    <CP.Styled.CardWrapper>
      <Paper
        sx={{
          width,
          height,
          minWidth: "48px",
          padding: "1rem",
          ...sx
        }}
        {...props}
      >
        {children}
      </Paper>
    </CP.Styled.CardWrapper>
  );
};

export default Card;
