import Project from "@/app/_models/projectModel";
import Task from "@/app/_models/taskModel";
import { PRIORITY_COLORS, TODO_STATUS } from "@/app/lib/constants";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Divider,
  Row,
  Col,
  Flex,
} from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import TaskUtilityButton from "@/app/_components/TaskUtilityButton";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  let project;
  let tasks: any[];

  try {
    project = await Project.findById(params.projectId);
    tasks = await Task.find({ projectId: params.projectId });
  } catch (e) {
    console.error(e);
  }

  let { Group } = Avatar;
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
    { title: project?.name },
  ];

  const ExtraButton = async({ status }: { status: string }) => {
    "use server";
    return (
      <div style={{ display: "flex", gap: 10 }}>
        <Button
          type="text"
          icon={<EllipsisOutlined />}
          style={{ backgroundColor: "transparent" }}
        />

        <Link href={`/task/new/${params.projectId}?status=${status}`} passHref>
          <Button
            type="text"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "transparent" }}
          />
        </Link>
      </div>
    );
  };

  const Content = ({
    title,
    description,
    priority,
    id,
  }: {
    title: string;
    description: string;
    priority: string;
    id: string;
  }) => {
    return (
      <div>
        <Flex justify="space-between" align="center">
          <Badge count={priority} color={PRIORITY_COLORS[priority]} />
          {/* <Button
           type="text"
            icon={<EllipsisOutlined />}
            style={{ backgroundColor: "transparent" }}
          /> */}
          <TaskUtilityButton taskId={id} />
        </Flex>

        <Title level={4}>{title}</Title>
        <p>{description}</p>

        <Divider />
      </div>
    );
  };

  const filteredTasks = (status:typeof TODO_STATUS[keyof typeof TODO_STATUS]) => {
    return tasks?.filter((task) => task.status === status);
  };

  return (
    <div>
      <Breadcrumb items={items} />
      <Flex
        align="center"
        justify="space-between"
        style={{ marginBottom: "20px", width: "100%" }}
      >
        <div style={{ width: "100%" }}>
          <Title level={1}>{project?.name}</Title>
          <Title level={5} style={{ width: "70%" }}>
            {project?.description}
          </Title>
        </div>
        <Link passHref href={`/task/new/${params.projectId}`}>
          <Button>Create task</Button>
        </Link>
      </Flex>

      <Row gutter={[16, 16]}>
        {/* To-Do */}
        {filteredTasks(TODO_STATUS.PENDING).length > 0 && (
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              title="To-Do"
              extra={<ExtraButton status={TODO_STATUS.PENDING} />}
              styles={{ header: { backgroundColor: "#C17FD1" } }}
            >
              {filteredTasks(TODO_STATUS.PENDING).map((_task) => {
                return (
                  <Content
                    key={_task.id}
                    description={_task.description}
                    title={_task.title}
                    priority={_task.priority}
                    id={_task.id}
                  />
                );
              })}
            </Card>
          </Col>
        )}
        {/* In-Progress */}
        {filteredTasks(TODO_STATUS.IN_PROGRESS).length > 0 && (
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              title="In Progress"
              extra={<ExtraButton status={TODO_STATUS.IN_PROGRESS} />}
              styles={{ header: { backgroundColor: "#FFCC4A" } }}
            >
              {filteredTasks(TODO_STATUS.IN_PROGRESS).map((_task) => {
                return (
                  <Content
                    key={_task.id}
                    description={_task.description}
                    title={_task.title}
                    priority={_task.priority}
                    id={_task.id}
                  />
                );
              })}
            </Card>
          </Col>
        )}
        {/* Completed */}
        {filteredTasks(TODO_STATUS.COMPLETED).length > 0 && (
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              title="Completed"
              extra={<ExtraButton status={TODO_STATUS.COMPLETED} />}
              styles={{ header: { backgroundColor: "#42B87E", border: "0" } }}
            >
              {filteredTasks(TODO_STATUS.COMPLETED).map((_task) => {
                return (
                  <Content
                    key={_task.id}
                    description={_task.description}
                    title={_task.title}
                    priority={_task.priority}
                    id={_task.id}
                  />
                );
              })}
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}
