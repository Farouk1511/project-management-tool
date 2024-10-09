"use client";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function ProjectDropDownMenu({
  projectId,
}: {
  projectId: string;
}) {
  const router = useRouter();
  const DELETE_PROJECT = gql`
    mutation DeleteProject($id: ID!) {
      deleteProject(id: $id) {
        name
        description
        _id
        color
      }
    }
  `;

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Error while deleting project: ", error);
    },
  });

  const items: MenuProps["items"] = [
    {
      key: "update",
      label: <Link href={`/project/update/${projectId}`}>Update</Link>,
    },
    {
      key: "delete",
      label: "Delete",
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: "Are you sure you want to delete this project?",
          content: "This action cannot be undone.",
          onOk: () =>
            deleteProject({
              variables: {
                id: projectId,
              },
            }), // Proceed to delete if confirmed
        });
      },
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <SettingOutlined />
    </Dropdown>
  );
}
