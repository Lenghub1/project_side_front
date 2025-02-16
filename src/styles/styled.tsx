import Dialog from "@mui/material/Dialog";
import styled from "styled-components";

type DivProps = {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  bg?: string;
  overflow?: "auto" | "hidden" | "unset" | "initial";
  direction?: "row" | "column";
  justify?:
    | "center"
    | "space-between"
    | "flex-end"
    | "flex-start"
    | "space-evenly";
  items?: "center" | "space-between" | "flex-end" | "flex-start";
  gap?: string;
  flex?: number;
  minwidth?: string;
  maxWidth?: string;
  borderRadius?: string;
  position?: string;
  opacity?: number;
  top?: number;
  left?: number;
};

export const Div = styled.div<DivProps>`
  box-sizing: border-box;
  width: ${({ width }) => (width ? width : "100%")};
  background: ${({ bg }) => (bg ? bg : "transparent")};
  height: ${({ height }) => (height ? height : "auto")};
  padding: ${({ padding }) => padding && padding};
  margin: ${({ margin }) => margin && margin};
  overflow: ${({ overflow }) => (overflow ? overflow : "hidden")};
  flex: ${({ flex }) => flex && flex};
  gap: ${({ gap }) => gap && gap};
  min-width: ${({ minwidth }) => minwidth && minwidth};
  max-width: ${({ maxWidth }) => maxWidth && maxWidth};
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  position: ${({ position }) => position && position};
  opacity: ${({ opacity }) => opacity && opacity};
  top: ${({ top }) => (top ? top : 0)};
  left: ${({ left }) => (left ? left : 0)};
`;

export const Wrapper = styled(Div)`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  overflow: ${({ overflow }) => (overflow ? overflow : "hidden")};
  padding: ${({ padding }) => (padding ? padding : "16px")};
`;

export const Flex = styled(Div)`
  display: flex;
  flex: ${({ flex }) => flex && flex};
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ items }) => (items ? items : "center")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  width: ${({ width }) => (width ? width : "100%")};
  padding: ${({ padding }) => (padding ? padding : "0")};
`;

export const Top = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${({ padding }) => (padding ? padding : "10px")};
  height: auto;
  justify-content: ${({ justify }) => (justify ? justify : "space-between")};
`;

export const Bottom = styled(Flex)`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${({ padding }) => (padding ? padding : "20px")};
  height: auto;
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "space-between")};
`;

export const Form = styled.form<DivProps>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  overflow: hidden;
  padding: ${({ padding }) => (padding ? padding : "16px")};
`;

export const InputWrapper = styled.div`
  width: 100%;

  & .MuiTextField-root {
    width: 100%;

    & .MuiInputBase-root {
      width: 100%;

      & input[type="number"] {
        /* Hide spinner */
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
`;
export const RadioWrapper = styled.div<DivProps>`
  width: 100%;
  & .MuiFormGroup-root {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;

    & label {
      display: flex;
      align-items: center;
    }
  }
`;

export const DatepickerWrapper = styled.div`
  width: 100%;
  height: 47px;

  & .MuiFormControl-root {
    width: 100%;
    height: 100%;
    & .MuiInputBase-root {
      height: 100%;
      & > input {
        text-align: center;
      }
    }
  }
`;

export const CardWrapper = styled.div<{ width?: string }>`
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  width: ${({ width }) => (width ? width : "fit-content")};
`;

export const Tag = styled.div<{
  color?: string;
  bg?: string;
  size?: string;
  width?: string;
  cursor?: string | null;
}>`
  width: ${({ width }) => (width ? width : "auto")};
  padding: 5px 10px;
  border-radius: 50px;
  background: ${({ bg }) => (bg ? bg : "#888")};
  color: ${({ color }) => (color ? color : "#fff")};
  font-weight: 700px;
  font-size: ${({ size }) => (size ? size : "12px")};
  text-align: center;
  cursor: ${({ cursor }) => (cursor ? cursor : "default")};
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
`;

export const StyleDialog = styled(Dialog)<DivProps>`
  & .MuiDialogActions-root {
    & > div {
      width: auto !important;
      & button {
        height: 40px;
      }
    }
  }
`;

export const InputBoxWrapper = styled.div`
  width: auto;

  & .MuiTextField-root {
    width: 44px;
    height: 44px;
    & .MuiInputBase-root {
      width: auto;
      & .MuiInputBase-input {
        maxlength: 1;
      }
    }
  }
`;
