"use client";
import { Breadcrumb, Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { TASK_PRIORITY, TODO_STATUS } from "@/app/lib/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page({ params }: { params: { taskId: string } }) {
  const [form] = Form.useForm();
  const router = useRouter();

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
    query GetTask($taskId: ID!) {
      getTask(taskId: $taskId) {
        id
        projectId
        priority
        status
        title
        description
        project {
          name
        }
      }
    }
  `;

  const UPDATE_TASK_QUERY = gql`
    mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
      updateTask(id: $id, input: $input) {
        id
        title
        description
        status
        priority
        projectId
        createdAt
        updatedAt
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: { taskId: params.taskId },
    skip: !params.taskId,
  });

  const [updateTask] = useMutation(UPDATE_TASK_QUERY, {
    onCompleted: () => {
      console.log("Task updated secessfully");
      form.resetFields();
      router.push('/task')
    },
    onError: (error) => {
      console.error("Error updating task", error);
    },
  });

  const onFinish = (formData: any) => {
    updateTask({
      variables: {
        id: params.taskId,
        input: {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
        },
      },
    });
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
    { title: "Update" },
  ];

  return loading ? (
    <p> loading...</p>
  ) : (
    <div>
      <Breadcrumb items={items} />
      <h1>Update Task</h1>
      <p>Make changes to your task!</p>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          ...data.getTask,
        }}
      >
        <Form.Item label="Project Name" name="name">
          <Input disabled placeholder={"project Name"} />
        </Form.Item>
        <Form.Item label="Project ID" name="projectId">
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
        >
          <Select style={{ width: 150 }} options={priorityOptions}></Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
