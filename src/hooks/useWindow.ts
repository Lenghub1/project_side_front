import { ModalProps } from "@/components/modal/Modal";
import Store from "@/store";
import { VariantType, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface CustomModalProps
  extends Omit<ModalProps, "open" | "onClose" | "children"> {}

interface SnackbarProps {
  type?: VariantType;
  hideDuration?: number;
}

const useWindow = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modal, setModal] = useRecoilState(Store.Layout.windowState);
  const [open, setOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const snackbar = (
    message: string,
    { type, hideDuration }: SnackbarProps = {
      type: "default",
      hideDuration: 1000,
    }
  ) => {
    enqueueSnackbar(message, {
      variant: type,
      autoHideDuration: hideDuration,
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
    });
  };

  useEffect(() => {
    if (open) return;

    setModal({
      open: false,
      onClose: () => {},
      children: "",
    });
  }, [open]);

  const onOkSubmit = (onOk?: () => void) => {
    if (onOk) onOk();

    setOpen(false);
  };

  const onCancelSubmit = (onCancel?: () => void) => {
    if (onCancel) onCancel();

    setOpen(false);
  };
  const alert = (message: string, { ...props }: CustomModalProps = {}) => {
    const { onOk, ...prop } = props;
    setOpen(true);
    setModal({
      open: true,
      type: "alert",
      onClose: () => setOpen(false),
      onOk: () => onOkSubmit(onOk),
      children: message,
      ...prop,
    });
  };

  const confirm = (message: string, { ...props }: CustomModalProps = {}) => {
    const { onOk, onCancel, ...prop } = props;

    setOpen(true);
    setModal({
      open: true,
      type: "confirm",
      onClose: () => setOpen(false),
      children: message,
      onOk: () => onOkSubmit(onOk),
      onCancel: () => onCancelSubmit(onCancel),
      ...prop,
    });
  };

  return {
    snackbar,
    alert,
    confirm,
  };
};

export default useWindow;
