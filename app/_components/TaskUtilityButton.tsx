"use client";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const TaskUtilityButton = ({ taskId }:{taskId : string}) => {
  const items: MenuItem[] = [
    {
      key: "update-delete",
      label: <EllipsisOutlined />,
      children: [
        {
          key: "update",
          label: <Link passHref href={`/task/update/${taskId}`}>Update</Link>,
          onClick: () => {
            console.log("task updateed");
          },
        },
        {
          key: "delete",
          label: <Link passHref href={`/task/delete/${taskId}`}>Delete</Link>,
          onClick: () => {
            console.log("task deleted");
          },
        },
        // { key: "7", label: "Option 7" },
        // { key: "8", label: "Option 8" },
      ],
    },
  ];

  return (
    <Menu
      style={{ backgroundColor: "transparent" }}
      mode="inline"
      theme="dark"
      inlineCollapsed={true}
      items={items}
    />
  );
};

export default TaskUtilityButton;
