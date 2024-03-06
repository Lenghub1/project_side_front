import Dialog from "@mui/material/Dialog";
import styled, { css } from "styled-components";

type DivProps = {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  bg?: string;
  overflow?: "auto" | "hidden" | "unset" | "initial";
  direction?: "row" | "column";
  justify?: "center" | "space-between" | "flex-end" | "flex-start";
  items?: "center" | "space-between" | "flex-end" | "flex-start";
  gap?: string;
  flex?: number;
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
`;

export const Wrapper = styled(Div)`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  overflow: hidden;
  padding: ${({ padding }) => (padding ? padding : "16px")};
`;

export const Flex = styled(Div)`
  display: flex;
  flex: ${({ flex }) => flex && flex};
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ items }) => (items ? items : "center")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
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
      & .MuiInputBase-input {
        padding: 12px 8px;
      }
    }
  }
`;

export const RadioWrapper = styled.div`
  width: auto;
  & .MuiFormGroup-root {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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

export const CardWrapper = styled.div<{
  bg?: string;
  height?: string;
  width?: string;
  isActive?: boolean;
  disabled?: boolean;
}>`
  width: ${({ width }) => (width ? width : "100%")};
  box-sizing: border-box;
  min-height: ${({ height }) => (height ? height : "47px")};
  height: ${({ height }) => (height ? height : "auto")};
  border-radius: 5px;
  background: ${({ bg }) => (bg ? bg : "#FFF")};
  color: #000;
  border: 1px solid #ccc;
  cursor: pointer;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  position: relative;
  ${({ isActive }) =>
    isActive &&
    css`
      border: 0px;
      background: #000;
      color: #fff;
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      background: #ccc;
      color: #666;
    `};
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

export const StyleDialog = styled(Dialog)`
  & .MuiDialogActions-root {
    & > div {
      width: auto !important;
      & button {
        height: 40px;
      }
    }
  }
`;
