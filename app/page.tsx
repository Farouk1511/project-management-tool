import { Button, Card, Empty, Flex } from "antd";
import { connectToMongoDB } from "./lib/connectDB";
import Project from "./_models/projectModel";
import { ProjectType } from "./lib/types";
import Link from "next/link";

export default async function Home() {
  let projects: ProjectType[] = [];

  try {
    await connectToMongoDB();

    projects = await Project.find();
  } catch (e) {
    console.log("Error fetch home page");
  }

  if (projects.length > 0) {
    return (
      <Flex wrap gap={10}>
        {projects.map((project) => (
          <Link href={`/project/${project._id}`} key={project._id}>
            <Card
              title={project.name}
              bordered={true}
              style={{ width: 300 }}
              styles={{ header: { backgroundColor: project.color ?? "black" } }}
            >
              <p>{project.description}</p>
            </Card>
          </Link>
        ))}
      </Flex>
    );
  }

  return (
    <>
      <Empty>
        <Link href={"/project/new"}>
          <Button>Create New Project </Button>
        </Link>
      </Empty>
    </>
  );
}
