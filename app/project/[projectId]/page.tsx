import Project from "@/app/_models/projectModel";
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

export default async function Page({ params }: { params: { projectId: string } }) {

  let project

  try{

    project = await Project.findById(params.projectId)
  }catch(e){
    console.error(e)
  }



  let { Group } = Avatar;
  let items = [
    { title: <Link href="//">Home</Link> },
    { title: <Link href="//">Project</Link> },
    { title: project?.name },
  ];

  const generateRandomBadge = () => {
    // Define options for color and count based on levels
    const options = [
      { count: "High", color: "red" },
      { count: "Medium", color: "orange" },
      { count: "Low", color: "yellow" },
    ];

    // Randomly select an option
    const randomIndex = Math.floor(Math.random() * options.length);
    const { count, color } = options[randomIndex];

    return <Badge count={count} color={color} />;
  };

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

  const content = (
    <div>
      <Flex justify="space-between" align="center">
        {generateRandomBadge()}
        <Button
          type="text"
          icon={<EllipsisOutlined />}
          style={{ backgroundColor: "transparent" }}
        />
      </Flex>

      <Title level={4}>Research</Title>
      <p>we need to research the items we want to sell on the app</p>

      <Divider />
    </div>
  );

  return (
    <div>
      <Breadcrumb items={items} />
      <Flex align="center" justify="space-between">
      <Title level={1}>{project?.name}</Title>
      <Link href={`/task/new/${params.projectId}`}>
      
      <Button>Create task</Button>
      
      </Link>
      

      </Flex>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            title="To-Do"
            extra={extraButton}
            styles={{ header: { backgroundColor: "#C17FD1" } }}
          >
            {content}
            {content}
            {content}
            {content}
            {content}
            {content}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            title="In Progress"
            extra={extraButton}
            styles={{ header: { backgroundColor: "#FFCC4A" } }}
          >
            {content}
            {content}
            {content}
            {content}
            {content}
            {content}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            title="Completed"
            extra={extraButton}
            styles={{ header: { backgroundColor: "#42B87E" } }}
          >
            {content}
            {content}
            {content}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
