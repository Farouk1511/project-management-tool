"use client";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import gql from "graphql-tag";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConfirmDeletion = ({
  id,
}: {
  id: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const DELETE_TASK_QUERY = gql`
  mutation DeleteTask($id: ID!) {
  deleteTask(id: $id) {
    id
    title
  }
}
  `

  const [deleteTask] = useMutation(DELETE_TASK_QUERY,{
    onCompleted: () => {
        console.log("Task deleted secessfully")
    },
    onError: (error)=>{
        console.error("Error deleting task",error)
    }
  })


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteTask({
      variables:{id}
    })
    setIsModalOpen(false);
    router.push('/task')
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    router.push('/task')
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
