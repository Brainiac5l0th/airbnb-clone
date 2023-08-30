"use client";

import useRentModal from "@/app/hooks/useRendModal";
import Modal from "./Modal";

const RentModal = () => {
  const rentModal = useRentModal();
  return (
    <Modal actionLabel="" onClose={rentModal.onClose} onSubmit={() => {}} />
  );
};

export default RentModal;
