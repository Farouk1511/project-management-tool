"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const ConfirmDeletion = ({
  id,
}: {
  id: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(!!id);
  }, [id]);

  return (
    <Modal
      title="Confirm Deletion"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete this task?</p>
    </Modal>
  );
};

export default ConfirmDeletion;
