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
import type { GetProp, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Project from "../_models/projectModel";

type MenuItem = GetProp<MenuProps, "items">[number];

export default async function SideMenu() {
  const projects = await Project.find();
  // you can use graphql here to just get the name and color and not have eto filter for description or waste compute to fetch description
  const projectMenuItems = projects.map((project) => {
    return {
      key: `/project/${project.id}`,
      label: (
        <Link passHref href={`/project/${project.id}`}>
          <Badge color={`${project.color}`} text={`${project.name}`} />
        </Link>
      ),
    };
  });

  const items: MenuItem[] = [
    {
      key: "grp0",
      label: "",
      type: "group",
      children: [
        {
          key: "/project/new",
          icon: <PlusCircleOutlined />,
          label: <Link passHref href={"/project/new"}>Create New Project</Link>,
        },
      ],
    },
    {
      key: "grp",
      label: "",
      type: "group",
      children: [
        {
          key: "//",
          icon: <HomeOutlined />,
          label: <Link passHref href={"//"}>Home</Link>,
        },
        {
          key: "/task",
          icon: <ProfileOutlined />,
          label: <Link passHref href={"/task"}>Tasks</Link>,
        },
        {
          key: "/members",
          icon: <UsergroupAddOutlined />,
          label: <Link passHref href={"/members"}>Members</Link>,
        },
        {
          key: "/dashboard",
          icon: <DashboardOutlined />,
          label: <Link passHref href={"/dashboard"}>Dashboard</Link>,
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "grp1",
      label: "My Projects",
      type: "group",
      children: projectMenuItems,
    },
  ];

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
      <Link passHref href={"/"}>
        <Title level={5} style={{ marginBottom: 30 }}>
          Project Management Tool
        </Title>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["2"]}
        items={items}
      />
    </Sider>
  );
}
