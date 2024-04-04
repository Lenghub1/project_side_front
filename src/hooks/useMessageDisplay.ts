import { useSnackbar } from "notistack";

const useMessageDisplay = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showMessage = (message: string, variant: "error" | "success") => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    });
  };

  return showMessage;
};

export default useMessageDisplay;
