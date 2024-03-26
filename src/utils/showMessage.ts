function showMessage(message: string, variant: "error" | "success") {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: {
      vertical: "bottom", // or 'bottom'
      horizontal: "left", // or 'left', 'center'
    },
  });
}
