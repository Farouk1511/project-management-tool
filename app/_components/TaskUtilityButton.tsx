"use client";
import { EllipsisOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";

const TaskUtilityButton = ({ taskId }: { taskId: string }) => {
  const items: MenuProps['items'] = [
    {
      key: "update",
      label: (
        <Link passHref href={`/task/update/${taskId}`}>
          Update
        </Link>
      ),
      onClick: () => {
        console.log("task updateed");
      },
    },
    {
      key: "delete",
      label: (
        <Link passHref href={`/task/delete/${taskId}`}>
          Delete
        </Link>
      ),
      danger: true,
      onClick: () => {
        console.log("task deleted");
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      autoAdjustOverflow
      overlayStyle={{ width: "100px" }}
    >
      <EllipsisOutlined />
    </Dropdown>
  );
};

export default TaskUtilityButton;
