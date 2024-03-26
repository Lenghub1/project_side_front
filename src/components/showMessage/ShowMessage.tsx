import { FC, useEffect } from "react";
import { useSnackbar } from "notistack";
interface SnackbarMessageProps {
  message: string;
  variant: "success" | "error";
}
const SnackbarMessage: FC<SnackbarMessageProps> = ({ message, variant }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    });
  }, [enqueueSnackbar, message, variant]);

  return null;
};

export default SnackbarMessage;
