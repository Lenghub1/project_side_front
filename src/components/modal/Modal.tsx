import CP from "@/components";
import { DialogActions, DialogContent } from "@mui/material";
import { ReactNode } from "react";

type ModalTypes = "alert" | "confirm";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  contentClassName?: string;
  bottom?: ReactNode;
  close?: boolean;
  style?: any;
  children: ReactNode;
  type?: ModalTypes;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  // okColor?: ButtonColor;
}

const Modal = ({
  open,
  onClose,
  close = true,
  style,
  className,
  contentClassName,
  bottom,
  children,
  type,
  onOk,
  onCancel,
  okText,
  cancelText,
}: ModalProps) => {
  return (
    <CP.Styled.StyleDialog open={open} onClose={onClose}>
      <DialogContent>{children}</DialogContent>

      {type ? (
        <DialogActions>
          {type === "confirm" ? (
            <>
              <CP.Button variant="text" onClick={onCancel ? onCancel : onClose}>
                {cancelText ? cancelText : "Cancel"}
              </CP.Button>
              <CP.Button variant="text" onClick={onOk ? onOk : onClose}>
                {okText ? okText : "Confirm"}
              </CP.Button>
            </>
          ) : type === "alert" ? (
            <CP.Button onClick={onOk ? onOk : onClose}>
              {okText ? okText : "Confirm"}
            </CP.Button>
          ) : (
            <></>
          )}
        </DialogActions>
      ) : bottom ? (
        bottom
      ) : (
        <></>
      )}
    </CP.Styled.StyleDialog>
  );
};

export default Modal;
