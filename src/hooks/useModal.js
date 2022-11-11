import { useState } from "react";

const useModal = () => {
  const
    [isOpenModal, setModalOpen] = useState(false),

    onOpenModal = () => setModalOpen(true),

    onCloseModal = () => setModalOpen(false);

  return { isOpenModal, onOpenModal, onCloseModal };
};

export default useModal;