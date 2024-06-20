import { Card, Flex } from "antd";

export default function Home() {
  return (
    <Flex wrap gap={10}>
      <Card
        title="Ecommerce App"
        bordered={true}
        style={{ width: 300 }}
        styles={{ header: { backgroundColor: "red" } }}
      >
        <p>A simple ecommerce app</p>
      </Card>
      <Card
        title="MDT8"
        bordered={true}
        style={{ width: 300 }}
        styles={{ header: { backgroundColor: "pink" } }}
      >
        <p>Mobile data terminal for public safety</p>
      </Card>
      <Card
        title="CAD8"
        bordered={true}
        style={{ width: 300 }}
        styles={{ header: { backgroundColor: "orange" } }}
      >
        <p>Computer aided dispatch for public safety</p>
      </Card>
      <Card
        title="Project management app"
        bordered={true}
        style={{ width: 300 }}
        styles={{ header: { backgroundColor: "blue" } }}
      >
        <p>A tool to help organize projects and tasks</p>
      </Card>
      <Card
        title="12n12"
        bordered={true}
        style={{ width: 300 }}
        styles={{ header: { backgroundColor: "grey" } }}
      >
        <p>
          An initiative to build 12 apps in 12 months with an MVP using
          differetn technologies
        </p>
      </Card>
    </Flex>
  );
}
