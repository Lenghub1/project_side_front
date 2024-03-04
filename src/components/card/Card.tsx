import CP from "@/components";
import { ReactNode } from "react";

export interface CardProps {
  children?: string | ReactNode;
  onClick?: (e: any) => void;
  isActive?: boolean;
  disabled?: boolean;
  height?: string;
  width?: string;
  bg?: string;
}

const Card = ({
  children,
  onClick,
  isActive,
  disabled,
  height,
  width,
  bg
}: CardProps) => {
  return (
    <CP.Styled.CardWrapper
      height={height}
      width={width}
      bg={bg}
      isActive={isActive}
      disabled={disabled}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </CP.Styled.CardWrapper>
  );
};

export default Card;
