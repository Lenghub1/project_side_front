import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import Store from "@/store";

const useCancelModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessTokenState, setAccessToken] = useRecoilState(
    Store.User.accessTokenState
  );

  const [open, setOpen] = useState<boolean>(false);

  const isResetPasswordRoute =
    location.pathname === "/forget-password/reset-password";
  // useEffect(() => {
  //   navigate("/login");
  // }, [open, accessTokenState]);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleCancelConfirm = () => {
    if (open) {
      if (isResetPasswordRoute) {
        setAccessToken(null);
      }
      navigate("/login");
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return {
    open,
    handleCancelConfirm,
    handleModalOpen,
    handleCloseModal,
  };
};

export default useCancelModal;
