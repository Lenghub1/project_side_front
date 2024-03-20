import { useSnackbar } from "notistack";

export function showMessage(message: string, variant: "error" | "success") {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: {
      vertical: "bottom", // or 'bottom'
      horizontal: "left", // or 'left', 'center'
    },
  });
}

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
