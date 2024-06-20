"use client";
import { Badge, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  PlusCircleOutlined,
  HomeOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import type { GetProp, MenuProps } from 'antd';
import { useRouter } from "next/navigation";

type MenuItem = GetProp<MenuProps, 'items'>[number];

const items : MenuItem[] = [
  {
    key: "grp0",
    label: "",
    type: "group",
    children: [
      {
        key: "/project/new",
        icon: <PlusCircleOutlined />,
        label: "Create new Project",
      },
    ],
  },
  {
    key: "grp",
    label: "",
    type: "group",
    children: [
      { key: "/home", icon: <HomeOutlined />, label: "Home" },
      { key: "/task", icon: <ProfileOutlined />, label: "Tasks" },
      { key: "/members", icon: <UsergroupAddOutlined />, label: "Members" },
      { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "grp1",
    label: "My Projects",
    type: "group",
    children: [
      { key: "/project/ecommerce-app", label: <Badge color="pink" text="Ecommerce App" /> },
      { key: "/project/mdt8", label: <Badge color="green" text="MDT8" /> },
      { key: "/project/cad8", label: <Badge color="blue" text="CAD8" /> },
      { key: "/project/project-management-app", label: <Badge color="red" text="Project management app" /> },
      { key: "/project/12n12", label: <Badge color="yellow" text="12n12" /> },
    ],
  },
];

export default function SideMenu() {
  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
    // router.push(e.keyPath)
    console.log(e);
    router.push(e.key);
  };
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Title level={5} style={{ marginBottom: 30 }}>
        Project Management Tool
      </Title>
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["2"]}
        items={items}
      />
    </Sider>
  );
}
