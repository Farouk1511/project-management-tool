"use client";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createTask } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { TASK_PRIORITY, TODO_STATUS } from "@/app/lib/constants";

export default function NewProject({
  params,
}: {
  params: { projectId: string };
}) {
  const [form] = Form.useForm();
  const [projectName, setProjectName] = useState<string>("");

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
    onCompleted: (data) => setProjectName(data?.getProject.name),
  });

  const onFinish = async (formData: FormData) => {
    try {
      console.log("Form Data:", formData);
      await createTask(formData);
      console.log("Project created successfully!");
      form.resetFields(); // Optionally reset form fields on successful submission
    } catch (error) {
      console.error("Error creating project:", error);
      // Implement error handling or feedback to the user
    }
  };

  console.log(params.projectId);

  return (
    <div>
      <h1>Create a new Task</h1>
      <p>Create a new task for your project!</p>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ projectId: params.projectId }}
      >
        <Form.Item label="Project Name" name="name">
          <Input disabled placeholder={projectName} />
        </Form.Item>
        <Form.Item label="Project ID" name="projectId" initialValue={123}>
          <Input  disabled />
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
          <Select
            style={{ width: 150 }}
            options={statusOptions}
            defaultValue={TODO_STATUS.PENDING}
          ></Select>
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please enter task priority" }]}
        >
          <Select
            style={{ width: 150 }}
            options={priorityOptions}
            defaultValue={TASK_PRIORITY.MEDIUM}
          ></Select>
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
