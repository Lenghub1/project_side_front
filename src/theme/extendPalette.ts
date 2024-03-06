export interface AccentColorPalette {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

interface PaletteOptionsExtensions {
  accent?: AccentColorPalette;
}

declare module "@mui/material/styles/createPalette" {
  interface Palette extends PaletteOptionsExtensions {}
  interface PaletteOptions extends PaletteOptionsExtensions {}
}
