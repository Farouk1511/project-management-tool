"use client";
import { Breadcrumb, Button, ColorPicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createProject } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { revalidatePath } from "next/cache";

export default function UpdateProject({
  params,
}: {
  params: { projectId: string };
}) {
  const [form] = Form.useForm();
  const router = useRouter();

  const GET_PROJECT = gql`
    query GetProject($projectId: ID!) {
      getProject(projectId: $projectId) {
        _id
        name
        description
        color
      }
    }
  `;

  const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: ID!, $input: UpdateProjectInput) {
      updateProject(id: $id, input: $input) {
        name
        description
        color
        _id
      }
    }
  `;

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => {
      console.log("Project updated secessfully");
      form.resetFields();
      //   revalidatePath('/',"layout")
      router.refresh();
      router.push("/");
    },
    onError: (error) => {
      console.error("Error updating project", error);
    },
  });

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId: params.projectId },
    skip: !params.projectId,
  });

  const onFinish = async (formData: any) => {
    try {
      updateProject({
        variables: {
          id: params.projectId,
          input: {
            name: formData.name as string,
            description: formData.description as string,
            color: formData.color as string,
          },
        },
      });
    } catch (error) {
      console.error("Error updating project:", error);
      // Implement error handling or feedback to the user
    }
  };

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
        <Link passHref href={`/project/${params.projectId}`}>
          {data?.getProject?.name}
        </Link>
      ),
    },
    { title: "Update Project" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    data && (
      <div>
        <Breadcrumb items={items} />

        <h1>Update project</h1>
        {/* <p>Create a new project and begin tracking tasks!</p> */}

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            name: data.getProject.name,
            description: data.getProject.description,
            color: data.getProject.color,
            projectId: data.getProject._id,
          }}
        >
          <Form.Item label="Project ID" name="projectId">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Project Name"
            name="name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input placeholder="Project name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter project description" },
            ]}
          >
            <TextArea placeholder="Description of the project" />
          </Form.Item>
          <Form.Item label="Project Color" name="color">
            <ColorPicker
              defaultFormat="hex"
              format="hex"
              trigger="hover"
              onChangeComplete={(color) => {
                form.setFieldValue("color", color.toHexString());
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
}
