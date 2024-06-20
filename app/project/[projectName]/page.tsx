import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Badge, Breadcrumb, Button, Card, Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";

export default function Page({ params }: { params: { projectName: string } }) {
  let { Group } = Avatar;
  let items = [
    {
      title: <Link href="//">Home</Link>,
    },
    {
      title: <Link href="//">Project</Link>,
    },
    {
      title: params?.projectName,
    },
  ];

  let extraButton = (
    <Flex gap={10}>
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
    </Flex>
  );

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

  let content = (
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
  let content0 = (
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
  let content1 = (
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
      <Title level={1}>{params.projectName}</Title>

      <Flex justify="space-between" align="center">
        <Card
          title="To-Do"
          extra={extraButton}
          style={{ width: "350px" }}
          styles={{ header: { backgroundColor: "#C17FD1" } }}
        >
          {content}
          {content0}
          {content1}
          {content}
        </Card>
        <Card
          title="In Progress"
          extra={extraButton}
          style={{ width: "350px" }}
          styles={{ header: { backgroundColor: "#FFCC4A" } }}
        >
          {content}
          {content0}
          {content}
          {content1}
        </Card>
        <Card
          title="Completed"
          extra={extraButton}
          style={{ width: "350px" }}
          styles={{ header: { backgroundColor: "#42B87E" } }}
        >
          {content1}
          {content}
          {content0}
          {content}
        </Card>
      </Flex>
    </div>
  );
}
