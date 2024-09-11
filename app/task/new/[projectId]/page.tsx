"use client";
import { Breadcrumb, Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createTask } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { TASK_PRIORITY, TODO_STATUS } from "@/app/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function NewProject({
  params,
}: {
  params: { projectId: string };
}) {
  const [form] = Form.useForm();
  const [projectName, setProjectName] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  //optional params
  const priorityParam = searchParams.get("priority");
  const statusParam = searchParams.get("status");

  const statusOptions = [
    { value: TODO_STATUS.PENDING, label: "To-do" },
    { value: TODO_STATUS.IN_PROGRESS, label: "In Progress" },
    { value: TODO_STATUS.COMPLETED, label: "Completed" },
  ];
  const priorityOptions = [
    { value: TASK_PRIORITY.LOW, label: "Low" },
    { value: TASK_PRIORITY.MEDIUM, label: "Medium" },
    { value: TASK_PRIORITY.HIGH, label: "High" },
    { value: TASK_PRIORITY.CRITICAL, label: "Critical" },
  ];

  const query = gql`
    query GetProject($projectId: ID!) {
      getProject(projectId: $projectId) {
        _id
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: { projectId: params.projectId },
    skip: !params.projectId,
    onCompleted: (data) => {
      setProjectName(data?.getProject.name);
    },
  });

  const onFinish = async (formData: FormData) => {
    try {
      console.log("Form Data:", formData);
      await createTask(formData);
      console.log("Project created successfully!");
      form.resetFields(); // Optionally reset form fields on successful submission
      router.push(`/project/${params?.projectId}`);
    } catch (error) {
      console.error("Error creating project:", error);
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
        <Link passHref href="/task">
          Tasks
        </Link>
      ),
    },
    { title: "New" },
  ];
  return (
    <div>
      <Breadcrumb items={items} />

      <h1>Create a new Task</h1>
      <p>Create a new task for your project!</p>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          projectId: params.projectId,
          status: statusParam ?? TODO_STATUS.PENDING,
        }}
      >
        <Form.Item label="Project Name" name="name">
          <Input disabled placeholder={projectName} />
        </Form.Item>
        <Form.Item label="Project ID" name="projectId" initialValue={123}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Task Title"
          name="title"
          rules={[{ required: true, message: "Please enter task title" }]}
        >
          <Input placeholder="Task title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter task description" }]}
        >
          <TextArea placeholder="Description of the task" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please enter task status" }]}
        >
          <Select style={{ width: 150 }} options={statusOptions}></Select>
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please enter task priority" }]}
          initialValue={TASK_PRIORITY.MEDIUM}
        >
          <Select style={{ width: 150 }} options={priorityOptions}></Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
