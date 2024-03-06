import { ReactNode } from "react";

export interface ReactNodeProps {
  children?: ReactNode;
}

export type ColorPalette =
  | "inherit"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "error"
  | "info"
  | "warning";
