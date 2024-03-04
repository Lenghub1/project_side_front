import CP from "@/components";

export type TypoVariantType = "header" | "title" | "normal";

export interface TypographyProps {
  variant?: TypoVariantType;
  children: string;
  color?: string;
  weight?: string;
  size?: string;
  wrap?: string;
  style?: any;
}

const Typography = ({
  variant,
  children = "",
  color,
  weight,
  size,
  wrap,
  style
}: TypographyProps) => {
  return (
    <CP.Styled.Typography
      variant={variant}
      color={color}
      weight={weight}
      size={size}
      wrap={wrap}
      style={style}
    >
      {children}
    </CP.Styled.Typography>
  );
};

export default Typography;
