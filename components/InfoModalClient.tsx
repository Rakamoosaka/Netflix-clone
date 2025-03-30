"use client";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

const InfoModalClient = () => {
  const { isOpen, closeModal } = useInfoModal();
  return <InfoModal visible={isOpen} onClose={closeModal} />;
};

export default InfoModalClient;
