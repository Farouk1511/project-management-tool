import TaskUtilityButton from "@/app/_components/TaskUtilityButton";
import Task from "@/app/_models/taskModel";
import { connectToMongoDB } from "@/app/lib/connectDB";
import { PRIORITY_COLORS, STATUS_COLORS } from "@/app/lib/constants";
import { SettingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Badge, Breadcrumb, Flex, Skeleton, Tag } from "antd";
import Title from "antd/es/typography/Title";
import gql from "graphql-tag";
import Link from "next/link";

export default async function Page({ params }: { params: { taskId: string } }) {
  let task;
  try {
    await connectToMongoDB();
    task = await Task.findById(params.taskId).populate("project").exec();
  } catch (e) {
    console.log(e);
    throw new Error("error in task");
  }

  console.log(task);

  let items = [
    {
      title: (
        <Link passHref href="//">
          Home
        </Link>
      ),
    },
    {
      title: (
        <Link passHref href="//">
          Project
        </Link>
      ),
    },
    {
      title: (
        <Link passHref href={`/project/${task?.project?._id}`}>
          {task?.project?.name}
        </Link>
      ),
    },
    { title: task?.title },
  ];

  return (
    <>
      <Flex justify="space-between">
        <Breadcrumb items={items} />
        <TaskUtilityButton taskId={params.taskId} icon={<SettingOutlined />} />
      </Flex>
      <Title level={1}>{task?.title}</Title>
      <Flex justify="flex-start" gap="small" style={{ width: "auto" }}>
        <Tag style={{ fontWeight: "bolder" }}>
          {new Date(task?.createdAt ?? "").toDateString()}
        </Tag>
        <Tag
          style={{ fontWeight: "bolder" }}
          color={PRIORITY_COLORS[task?.priority ?? ""]}
        >
          {task?.priority}
        </Tag>
        <Tag
          style={{ fontWeight: "bolder" }}
          color={STATUS_COLORS[task?.status ?? ""]}
        >
          {task?.status}
        </Tag>
      </Flex>
      <Title level={4}>{task?.description}</Title>
    </>
  );
}
