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

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: <EllipsisOutlined />,
    children: [
      {
        key: "5",
        label: "Edit",
        onClick: () => {
          console.log("task edited");
        },
      },
      {
        key: "6",
        label: "Delete",
        onClick: () => {
          console.log("task deleted");
        },
      },
      // { key: "7", label: "Option 7" },
      // { key: "8", label: "Option 8" },
    ],
  },
];

const TaskUtilityButton = ({}) => {
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
