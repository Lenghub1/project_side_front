import { ModalProps } from "@/components/modal/Modal";
import { atom } from "recoil";

// Modal(alert)
export const windowState = atom<ModalProps>({
  key: `modal_${new Date().getTime()}`,
  default: {
    open: false,
    onClose: () => {},
    children: ""
  }
});

// sideBar
export const sidebarState = atom<boolean>({
  key: `sidebarState`,
  default: false
});
