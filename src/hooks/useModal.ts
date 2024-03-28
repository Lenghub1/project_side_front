import { useCallback, useState } from "react";

const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
