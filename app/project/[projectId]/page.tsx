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
    { title: <Link href="//">Home</Link> },
    { title: <Link href="//">Project</Link> },
    { title: project?.name },
  ];

  const extraButton = (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        type="text"
        icon={<EllipsisOutlined />}
        style={{ backgroundColor: "transparent" }}
      />
      <Button
        type="text"
        icon={<PlusOutlined />}
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );

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

  const filteredTasks = (status: keyof typeof TODO_STATUS) => {
    return tasks?.filter((task) => task.status === TODO_STATUS[status]);
  };

  return (
    <div>
      <Breadcrumb items={items} />
      <Flex align="center" justify="space-between">
        <div>

        <Title level={1}>{project?.name}</Title>
        <Title level={5}>{project?.description}</Title>
        </div>
        <Link href={`/task/new/${params.projectId}`}>
          <Button>Create task</Button>
        </Link>
      </Flex>

      <Row gutter={[16, 16]}>
        {/* To-Do */}
        {filteredTasks("PENDING").length > 0 && (
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              title="To-Do"
              extra={extraButton}
              styles={{ header: { backgroundColor: "#C17FD1" } }}
            >
              {filteredTasks("PENDING").map((_task) => {
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
        {filteredTasks("IN_PROGRESS").length > 0 && (
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              title="In Progress"
              extra={extraButton}
              styles={{ header: { backgroundColor: "#FFCC4A" } }}
            >
              {filteredTasks("IN_PROGRESS").map((_task) => {
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
        {filteredTasks("COMPLETED").length > 0 && (
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              title="Completed"
              extra={extraButton}
              styles={{ header: { backgroundColor: "#42B87E",border:"0" } }}
            >
              {filteredTasks("COMPLETED").map((_task) => {
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
