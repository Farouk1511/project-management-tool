"use client"
import { Button, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function NewProject() {
  const [form] = Form.useForm();

  return (
    <div>
      <h1>Create a new project</h1>
      <p>Create a new project and begin tracking tasks!</p>

      <Form layout={"vertical"} form={form}>
        <Form.Item label="Project Name">
          <Input placeholder="project name" />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea placeholder="description of the project"  />
        </Form.Item>
        <Form.Item >
          <Button type="primary">Create</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
