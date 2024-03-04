import { Drawer } from "@mui/material";
import { ReactNode } from "react";

export interface PopoverProps {
  open: boolean;
  onClose: (e: boolean) => void;
  direction?: "right" | "left" | "bottom";
  children?: ReactNode;
}

const Popover = ({
  direction = "left",
  children,
  open,
  onClose
}: PopoverProps) => {
  return (
    <Drawer anchor={direction} open={open} onClose={onClose}>
      {children}
    </Drawer>
  );
};

export default Popover;
