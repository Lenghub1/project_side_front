import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface SnackbarProps {
  open: boolean;
  message: string;
  actionButtonLabel?: string;
  actionButtonOnClick?: () => void;
  autoHideDuration?: number;
}

const SnackBar: React.FC<SnackbarProps> = ({
  open,
  message,
  actionButtonLabel,
  actionButtonOnClick,
  autoHideDuration = 6000,
}) => {
  const [openState, setOpenState] = React.useState(open);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenState(false);
  };

  const action = (
    <React.Fragment>
      {actionButtonOnClick && (
        <Button color="secondary" size="small" onClick={actionButtonOnClick}>
          {actionButtonLabel}
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={openState}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
};

export default SnackBar;
