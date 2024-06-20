"use client";
import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  PlusCircleOutlined,
  HomeOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import SideMenu from "./SideMenu";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { key: 1, icon: <PlusCircleOutlined />, label: "Create new Project" },
  { key: 2, icon: <HomeOutlined />, label: "Home" },
  { key: 3, icon: <ProfileOutlined />, label: "Tasks" },
  { key: 4, icon: <UsergroupAddOutlined />, label: "Members" },
  { key: 5, icon: <DashboardOutlined />, label: "Dashboard" },
];

export default function Main() {
 
  return <div>content</div>;
}
