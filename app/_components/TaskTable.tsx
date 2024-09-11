"use client";
import { Space, Table, TableProps, Tag } from "antd";
import { STATUS_COLORS, PRIORITY_COLORS } from "../lib/constants";
import { DataType } from "../lib/types";
import Link from "next/link";

export default function TaskTable({ data }: { data: DataType[] }) {
  //title
  //description
  //status
  //priority
  //created
  //project

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag style={{ fontWeight: "bolder" }} color={STATUS_COLORS[status]}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (_, { priority }) => (
        <Tag style={{ fontWeight: "bolder" }} color={PRIORITY_COLORS[priority]}>
          {priority}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link passHref href={`/task/update/${record.key}`}>Update</Link>
          <Link passHref href={`?delete=${record.key}`}>Delete</Link>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
